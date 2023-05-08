import express from 'express';
import { exeAnalyze, getData, getSentiments, insertData, insertDataPackage } from '../controllers/main.controller.js';

const mainRoutes = express.Router();

mainRoutes.route('/analyze')
  .get(getSentiments)
  .post(exeAnalyze);

mainRoutes.route('/package')
  .get(insertDataPackage);

mainRoutes.route('/data')
  .get(getData)
  .post(insertData);


export default mainRoutes;
