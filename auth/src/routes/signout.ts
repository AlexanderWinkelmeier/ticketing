import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  console.log("signout route");
  req.session = null;
  res.send({});
});

export { router as signoutRouter };
