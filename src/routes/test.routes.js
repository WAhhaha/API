import express from 'express';
import { getFlag, insertPTT, testPostData } from '../controllers/test.controller.js';
import { createAnalysis, getSentiments } from '../controllers/main.controller.js';

const testRoutes = express.Router();


testRoutes.route('/flag')  
  .get(getFlag);

testRoutes.route('/')
  .post(testPostData);

testRoutes.route('/analyze')
  .get(getSentiments)
  .post(createAnalysis);

testRoutes.route('/insert')
  .get(insertPTT);

export default testRoutes;
