const router = require('express').Router();

const spotsRouter = require('./spots.js')
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const reviewsRouter = require('./reviews.js')
const { requireAuth } = require('../../utils/auth')
//const { restoreUser } = require("../../utils/auth.js");

router.get('/test', requireAuth, (req, res) => {
  res.json({ message:'success' })
})


//router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/spots', spotsRouter)

router.use('/users', usersRouter);

router.use('/reviews', reviewsRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});



// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );



module.exports = router;
