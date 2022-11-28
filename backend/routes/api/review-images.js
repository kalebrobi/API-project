const express = require('express');
const router = express.Router();
const  { Spot, Review, SpotImage, User, ReviewImage, Booking }  = require('../../db/models');
const { requireAuth, restoreUser, setTokenCookie} = require('../../utils/auth')



//delete an existing image for a review by the reviewImage id
//confirm that the current user is the one who left the review the image is associated with

router.delete('/:imageId', requireAuth, async(req, res) => {
  const reviewImageTobeDeleted = await ReviewImage.findByPk(req.params.imageId)
  if(reviewImageTobeDeleted) {
    const reviewForImage = await Review.findOne({
      where: {
        id: reviewImageTobeDeleted.reviewId
      }
    })

    if(reviewForImage.userId === req.user.id){
      await reviewImageTobeDeleted.destroy()
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
      message: "Review Image couldn't be found",
      statusCode: 404
    })
  }

})









module.exports = router
