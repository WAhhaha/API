import express from 'express';
import { getFlag, insertData, insertExampleData, testPostData, getData } from '../controllers/dev.controller.js';

const devRoutes = express.Router();


devRoutes.route('/flag')  
  .get(getFlag);

devRoutes.route('/')
  .post(testPostData);

devRoutes.route('/data')
  .get(getData)
  .post(insertData);

devRoutes.route('/exdata')
  .get(insertExampleData);

export default devRoutes;
