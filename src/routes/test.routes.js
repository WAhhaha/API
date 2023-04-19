import express from 'express';
import {getFlag, testanalyzing} from '../controllers/test.controller.js';

const testRoutes = express.Router();


testRoutes.route('/flag')  
  .get(getFlag);

testRoutes.route('/analyze')
  .get(testanalyzing);
//export default pttRoutes;
export default testRoutes;
