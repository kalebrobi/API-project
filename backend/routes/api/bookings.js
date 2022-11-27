const express = require('express');
const router = express.Router();
const  { Spot, Review, SpotImage, User, ReviewImage, Booking }  = require('../../db/models');
const spot = require('../../db/models/spot');
const { requireAuth, restoreUser } = require('../../utils/auth');




//bookings table has the spotId ref(SPOT) userId ref(USER), startDate and endDate
//we want to get the current user and return all the bookings with that userId
//step 1: get current user => the user making the req
//step 2: return all the bookings using that users id

router.get('/current', requireAuth, async(req, res) => {
  console.log(req.user.id)
  const bookingsForUser = await Booking.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: Spot.scope('getReviewsOfUser'),
        include:[
          {
            model: SpotImage
          }
        ]
      }
    ]
  })

let bookingsArr = []
bookingsForUser.forEach(booking => {
  bookingsArr.push(booking.toJSON())
});

bookingsArr.forEach(eachBooking => {
  if(eachBooking.Spot){
    let spotObj = eachBooking.Spot
    if(spotObj.SpotImages){
      spotObj.previewImage = spotObj.SpotImages[0].url
      delete spotObj.SpotImages
    } else {
      spotObj.previewImage = 'no preview image available'
      delete spotObj.SpotImages
    }
  }
})


  console.log(bookingsForUser)

  res.json({
    Bookings: bookingsArr
  })
})













module.exports = router
