const express = require('express');
const router = express.Router();
const  { Spot, Review, SpotImage, User, ReviewImage }  = require('../../db/models');
const { requireAuth, restoreUser, setTokenCookie} = require('../../utils/auth')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');



router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const reviewToAddImageToo = await Review.findByPk(req.params.reviewId)
  if(reviewToAddImageToo){
    const {url} = req.body
    const newReviewImage = await reviewToAddImageToo.createReviewImage({
      url,
    })
    const allReviewImages = await ReviewImage.findAll({
      where: {
        reviewId: newReviewImage.reviewId
      }
    })

    let imgCountArr = []
    allReviewImages.forEach(element => {
    imgCountArr.push(element.toJSON())
   });
      if(imgCountArr.length > 10){
        res.statusCode = 403
          return res.json({
          message: "Maximum number of images for this resource was reached",
          statusCode: 403
         })
    } else { res.json ({
          id: newReviewImage.id,
          url: newReviewImage.url
       })
    }

  } else {
    res.statusCode = 404
    res.json({
      message: "Review couldn't befound",
      statusCode: 404
    })
   }
})


module.exports = router










// let reviewsArry = []
// const allImagesForAReview = await ReviewImage.findAll()
// allImagesForAReview.forEach(element => {
//   reviewsArry.push(element.toJSON())
// });
// console.log(reviewsArry)
