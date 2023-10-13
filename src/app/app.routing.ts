import express from 'express';
const router = express.Router();

router.get('/test', (req, res, next) => {
    next('error page.');
});

router.get('/data/error', (req, res, next) => {
    // Fake API
    const getProfile = new Promise((resolve, reject) => {
      setTimeout(() => resolve({ name: 'HAO', age: 22 }), 100);
    });
    const getFriends = new Promise((resolve, reject) => {
      setTimeout(() => resolve([]), 120);
    });
    const errorRequest = new Promise((resolve, reject) => {
      setTimeout(() => reject('Oops!'), 2000);
    });
  
    getProfile
    .then(profile => getFriends)
    .then(friends => errorRequest)
    .then(() => res.send('GoGoGo!'))
    .catch(err => next(err));
  });

export default router;

