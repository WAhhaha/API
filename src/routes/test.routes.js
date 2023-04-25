import express from 'express';
import {getFlag, insertPTT, targetAnalyze} from '../controllers/test.controller.js';

const testRoutes = express.Router();


testRoutes.route('/flag')  
  .get(getFlag);

testRoutes.route('/insert')
  .get(insertPTT);

testRoutes.route('/analyze')
  .post(targetAnalyze)

export default testRoutes;
