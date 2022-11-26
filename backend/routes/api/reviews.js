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


router.get('/current', requireAuth, restoreUser,
async(req, res) => {
  const { user } = req
  usersId = user.id
  const usersReviews = await Review.findAll({
    where: {
      userId: user.id
    },
    include: [
      {
        model: User.scope('getReviewsOfUser')
      },
      {
        model: Spot.scope('getReviewsOfUser'),
        include:[
          {
            model: SpotImage,
          }
        ]
      },
      {
        model: ReviewImage.scope('getReviewsOfUser')
      },
    ]
  })

  let modifiedArr = []
  usersReviews.forEach(eachRev => {
    modifiedArr.push(eachRev.toJSON()) //converted data into a way we can manipulate it
  })

modifiedArr.forEach(eachModifiedRev => {
  if(eachModifiedRev.Spot){
    let spotObj = eachModifiedRev.Spot
    if(spotObj.SpotImages){
     spotObj.previewImage = spotObj.SpotImages[0].url
     delete spotObj.SpotImages
    } else {
      spotObj.previewImage = "no preview image available"
      delete spotObj.SpotImages
    }
  }
})

  res.json({
    Reviews: modifiedArr
  }

)
})







module.exports = router
