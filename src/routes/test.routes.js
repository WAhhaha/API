import express from 'express';
import {getFlag} from '../controllers/test.controller.js';

const testRoutes = express.Router();


testRoutes.route('/flag')  
  .get(getFlag);

//export default pttRoutes;
export default testRoutes;
