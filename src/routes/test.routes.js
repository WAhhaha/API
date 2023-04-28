import express from 'express';
import {getFlag, insertPTT, CreateTargetAnalyze, GetAnalyzeResults} from '../controllers/test.controller.js';

const testRoutes = express.Router();


testRoutes.route('/flag')  
  .get(getFlag);

testRoutes.route('/insert')
  .get(insertPTT);

testRoutes.route('/analyze')
  .get(GetAnalyzeResults)
  .post(CreateTargetAnalyze);



export default testRoutes;
