import express from 'express';
import { createAnalysis, getSentiments } from '../controllers/main.controller.js';

const mainRoutes = express.Router();

mainRoutes.route('/analyze')
  .get(getSentiments)
  .post(createAnalysis);

export default mainRoutes;
