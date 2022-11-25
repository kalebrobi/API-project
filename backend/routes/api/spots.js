const express = require('express');
const router = express.Router();
const  { Spot, Review, SpotImage, User }  = require('../../db/models');
const { requireAuth, restoreUser} = require('../../utils/auth')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('address')
    .exists({checkFalsy: true})
    .withMessage('Street address is required'),
  check('city')
    .exists({checkFalsy: true})
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({checkFalsy: true})
    .isDecimal({checkFalsy: true})
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({checkFalsy: true})
    .isDecimal({checkFalsy: true})
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
];

router.get('/', async(req,res) => {
  const spots = await Spot.findAll({
    include: [
      {
        model: Review
      },
      {
        model: SpotImage
      }
    ]
  })

 let spotsList = []
 spots.forEach(eachSpot => {
  spotsList.push(eachSpot.toJSON())
 })

 let sum = 0
 let count = 0
 spotsList.forEach(eachSpot => {
  let reviewsForEachSpot = eachSpot.Reviews
   reviewsForEachSpot.forEach(eachReview => {
    if(eachReview.stars){
      sum++
      count = count + eachReview.stars
    }

  })
  let avg = count / sum
  eachSpot.avgRating = avg
  delete eachSpot.Reviews
})



 spotsList.forEach(eachSpot => {
  eachSpot.SpotImages.forEach(eachImageObj => {
   // console.log(eachImageObj.preview)
    if(eachImageObj.preview === true) {
      //console.log(eachImageObj)
     eachSpot.preview = eachImageObj.url
    }
  })
  if(!eachSpot.preview) {
    eachSpot.preview = 'No preview image found'
  }
  delete eachSpot.SpotImages
 })

  res.json({
    Spots: spotsList
  })
})

//create a spot

router.post('/', requireAuth, validateSignup,
async(req, res) => {
const {address, city, state, country, lat, lng, name, description, price} = req.body;
  const newHome = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })

  return res.json(
    newHome
  )
})

router.post('/:spotId/images', requireAuth,
async(req, res) => {
  // const {url, preview } = req.body
  const spot = await Spot.findByPk(req.params.spotId);
  if(spot){
  const {url, preview } = req.body
  const newImage = await spot.createSpotImage({
    url,
    preview,
  })
  console.log(newImage)
  res.json({
    id: newImage.id,
    url: newImage.url,
    preview: newImage.preview
  })
} else {
  res.statusCode = 404
  res.json({
    message: "Spot could not be found",
    statusCode: 404
  })
}
})





module.exports = router;
