const express = require('express');
const router = express.Router();
const  { Spot, Review, SpotImage, User, ReviewImage }  = require('../../db/models');
const { requireAuth, restoreUser, setTokenCookie} = require('../../utils/auth')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');

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



//create an image for a review by reviewId
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

//get reviews of current user
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
    if(spotObj.SpotImages[0]){
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


router.put('/:reviewId', requireAuth, validateReviewPost, async(req, res) => {
  const reviewToUpdate = await Review.findByPk(req.params.reviewId);
  if(reviewToUpdate){
    const {review, stars} = req.body
    if(review){
      reviewToUpdate.review = review
    }
    if(stars){
      reviewToUpdate.stars = stars
    }
    await reviewToUpdate.save()
    res.json(reviewToUpdate)

  } else {
    res.statusCode = 404
    res.json({
      message: "Review couldn't be found",
      statusCode: 404
    })
  }
})

//delete a review by reviewId
//make sure that the review belongs to the current user
router.delete('/:reviewId', requireAuth, async(req, res) => {
  const reviewToDelete = await Review.findByPk(req.params.reviewId)
  if(reviewToDelete){
    if(reviewToDelete.userId === req.user.id){
      await reviewToDelete.destroy()
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
      message: "Review couldn't be found",
      statusCode: 404
    })
  }
})




module.exports = router
