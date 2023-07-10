import express from 'express';
import health from './health';
import authentication from './authentication';
import users from './users';
import wines from './wines';

const router = express.Router();

export default (): express.Router => {
  health(router);
  authentication(router);
  users(router);
  wines(router);

  return router;
};