const express = require('express');
const router = express.Router();
const  { Spot, Review, SpotImage, User }  = require('../../db/models');
const { requireAuth, restoreUser, setTokenCookie} = require('../../utils/auth')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const user = require('../../db/models/user');


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

const validateReviewPost = [
  check('review')
    .exists({checkFalsy: true})
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({min: 1, max:5})
    .withMessage("Stars must be an integer from 1 to 5"),
 handleValidationErrors
]

//Get all Spots
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

//Get all Spots owned by the Current User
router.get('/current', requireAuth, restoreUser,
async(req, res) => {
  const {user} = req
  usersId = user.id
  const usersSpots = await Spot.findAll({
    where: {
      ownerId: user.id
    },
    include: [
      {
        model: Review
      },
      {
        model: SpotImage
      }
    ]
  })
  let arrayOfSpots = []
  usersSpots.forEach(spot => {
    arrayOfSpots.push(spot.toJSON())
  })
  let sum = 0
  let count = 0
  arrayOfSpots.forEach(spot => {
    let reviewsForEachSpot = spot.Reviews
    reviewsForEachSpot.forEach(eachReview => {
     if(eachReview.stars){
       sum++
       count = count + eachReview.stars
     }
    })
    let avg = count / sum
    spot.avgRating = avg
    delete spot.Reviews
})
arrayOfSpots.forEach(eachSpot => {
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
    Spots: arrayOfSpots
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

//Add an Image to a Spot based on the Spot's id
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

//Get details of a Spot from an id
router.get('/:spotId', async(req,res) => {
  const spotDetails = await Spot.findByPk(req.params.spotId, {
    include:[
      {
        model: Review
      },
      {
        model: SpotImage,
        attributes: {
          exclude: ['spotId', 'createdAt', 'updatedAt']
        }
      },
      {
        model: User,
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt",'username']
        },
      }
    ]
  })

  if(spotDetails){

  const changeSpotDeets = [spotDetails.toJSON()]

  let reviewArrayOfObjs = changeSpotDeets[0].Reviews

    let sum = 0
    let count = 0
  reviewArrayOfObjs.forEach(review => {
    if(review.stars) {
      sum += review.stars
      count++
    }
  })
  let avg = sum / count
  changeSpotDeets[0].avgStarRating = avg
  changeSpotDeets[0].numReviews = count
  delete changeSpotDeets[0].Reviews
  let spotDetailObj = changeSpotDeets[0]

  spotDetailObj.Owner = spotDetailObj.User
  delete spotDetailObj.User

  res.json(spotDetailObj)
} else {
  res.statusCode = 404
  res.json({
    message: "Spot couldn't be found",
    statusCode: 404
  })
}
})

router.put('/:spotId', requireAuth,validateSignup, async(req,res) => {
  const spotToUpdate = await Spot.findByPk(req.params.spotId);
  if(spotToUpdate){
  const {address, city, state, country, lat, lng, name, description, price} = req.body
  if(address){
    spotToUpdate.address = address
  }
  if(city){
    spotToUpdate.city = city
  }
  if(state){
    spotToUpdate.state = state
  }
  if(country){
    spotToUpdate.country = country
  }
  if(lat){
    spotToUpdate.lat = lat
  }
  if(lng){
    spotToUpdate.lng = lng
  }
  if(name){
    spotToUpdate.name = name
  }
  if(description){
    spotToUpdate.description = description
  }
  if(price){
    spotToUpdate.price = price
  }

  await spotToUpdate.save();
  res.json(spotToUpdate)
} else {
  res.statusCode = 404
  res.json({
    message: "Spot could not be found",
    statusCode: 404
  })
}

})

router.post('/:spotId/reviews', requireAuth, validateReviewPost,
async(req, res) => {

let reviewList = []
const spotToAddReviewTo = await Spot.findByPk(req.params.spotId);
if(spotToAddReviewTo) {
const reviewsForSpot = await spotToAddReviewTo.getReviews()


reviewsForSpot.forEach(review => {
  reviewList.push(review.toJSON())
})

for(let i = 0; i < reviewList.length; i++){
  if(reviewList[i].userId === req.user.id){
    res.statusCode = 403
    return res.json({
      message: "User already has a review for this spot",
      statusCode: 403
    })
  }
}
   // console.log(spotToAddReviewTo)
    const {review, stars} = req.body
    const newReview = await spotToAddReviewTo.createReview({
      userId: req.user.id,
      review,
      stars
    })

    res.statusCode = 201
    res.json(
      newReview
  )
  } else {
    res.statusCode = 404
    res.json({
      message: "Spot couldnt be found",
      statusCode: 404
    })
  }
})









module.exports = router;
