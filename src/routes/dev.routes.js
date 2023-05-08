import express from 'express';
import { getFlag, testPostData } from '../controllers/dev.controller.js';

const devRoutes = express.Router();


devRoutes.route('/flag')  
  .get(getFlag);

devRoutes.route('/')
  .post(testPostData);



export default devRoutes;
