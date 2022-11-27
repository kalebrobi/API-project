const express = require('express');
const router = express.Router();
const  { Spot, Review, SpotImage, User, ReviewImage, Booking }  = require('../../db/models');
const { requireAuth, restoreUser, setTokenCookie} = require('../../utils/auth')


//delete a spotImage
//make sure that the spot belongs to current user
router.delete('/:imageId', requireAuth, async(req, res) => {
   console.log(req.user.id)
  // console.log("------------------------------")
  const imageToDelete = await SpotImage.findByPk(req.params.imageId)
  if(imageToDelete){
    const spotForTheImage = await Spot.findOne({
      where: {
        id: imageToDelete.spotId
      }
    })
    if(spotForTheImage.ownerId === req.user.id) {
      await imageToDelete.destroy()
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
      message: "Spot Image couldn't be found",
      statusCode: 404
    })
  }
})





module.exports = router
