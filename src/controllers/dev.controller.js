import HttpStatus from "../utils/HttpStatus.js";
import Response from "../utils/response.js";
import logger from "../utils/logger.js";
//import from utils

import db from "../db/mysql.config.js";

import { readfile } from "../os/functions.js";


export const getFlag = (request, response) => {

  let flag = {
    content: `this is your flag`,
  };

  logger.info(`${request.method}, ${request.originalUrl}, getting flag`);
  response.status(HttpStatus.OK.code)
    .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Flag fetched`, flag));
};

export const testPostData = async (request ,response) => {

  logger.info(`${request.method}, ${request.originalUrl}, posting a data`);
  
  let data = request.body;
  console.log(data);

  response.status(HttpStatus.CREATED.code)
    .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `data posted`, data));
};

