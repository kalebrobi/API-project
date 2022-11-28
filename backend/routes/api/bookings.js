const express = require('express');
const router = express.Router();
const  { Spot, Review, SpotImage, User, ReviewImage, Booking }  = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');




//bookings table has the spotId ref(SPOT) userId ref(USER), startDate and endDate
//we want to get the current user and return all the bookings with that userId
//step 1: get current user => the user making the req
//step 2: return all the bookings using that users id

router.get('/current', requireAuth, async(req, res) => {
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

  res.json({
    Bookings: bookingsArr
  })
})

//edit a booking by the booking id
//the current user MUST be the the one who the booking belongs to to edit it
//so the userId on the booking MUST match the current users Id

router.put('/:bookingId', requireAuth, async(req, res) => {
  console.log(req.user.id)
  const bookingToBeEdited = await Booking.findByPk(req.params.bookingId)
  if(bookingToBeEdited){

  if(req.user.id === bookingToBeEdited.userId){
    const {startDate, endDate} = req.body

    if(startDate){
      bookingToBeEdited.startDate = startDate
    }
    if(endDate) {
      bookingToBeEdited.endDate = endDate
    }
    await bookingToBeEdited.save()
    res.json(bookingToBeEdited)

  } else {
    res.statusCode = 403
    res.json({
      message: "Forbidden",
      statusCode: 403
    })
  }
} else {
  res.statusCode = 404
  res.json({
    message: "Booking couldn't be found",
    statusCode: 404
  })

}

})

//delete a booking
//only a user who made the booking OR the owner of the spot can delete a booking
//step 1: get the current user using req.user
//step 2: get the booking using findByPk
//step 3: get the spot for the booking
//step 4: confirm that the current user is either the spotOwner OR the user who set the booking


router.delete('/:bookingId', requireAuth, async(req, res) => {
  const bookingToDelete = await Booking.findByPk(req.params.bookingId)
  if(bookingToDelete) {
    const spotForTheBooking = await Spot.findOne({
      where: {
        id: bookingToDelete.spotId
      }
    })

    if(req.user.id === bookingToDelete.userId || req.user.id === spotForTheBooking.ownerId) {
      await bookingToDelete.destroy()
      res.statusCode = 200
      res.json({
        message: "Successfully deleted",
        statusCode: 200
      })
    } else {
      res.statusCode = 403
      res.json({
        message: "Forbidden",
        statusCode: 403
      })
    }

  } else {
    res.statusCode = 404
    res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  }
})











module.exports = router
