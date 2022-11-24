const express = require('express');
const router = express.Router();
const  { Spot, Review, SpotImage, Booking }  = require('../../db/models')
const { requireAuth } = require('../../utils/auth')


router.get('/',requireAuth, async(req,res) => {
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






module.exports = router;
