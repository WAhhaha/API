import HttpStatus from "../utils/HttpStatus.js";
import Response from "../utils/response.js";
import logger from "../utils/logger.js";
//import from utils

import db from "../db/mysql.config.js";

import { insertPTTdata } from "../os/ssm.js";

export const getFlag = (request, response) => {

  let flag = {
    content: `this is your flag`,
  };

  logger.info(`${request.method}, ${request.originalUrl}, getting flag`);
  response.status(HttpStatus.OK.code)
    .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Flag fetched`, flag));
};

export const testPostData = (request ,response) => {

  logger.info(`${request.method}, ${request.originalUrl}, posting a data`);
  
  let data = request.body;

  response.status(HttpStatus.CREATED.code)
    .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `data posted`, data));
};

export const insertPTT = (request, response) => {

  insertPTTdata('/home/ahhaha9191/Documents/SAproject/API/datafiles/json/content.json');
  response.status(HttpStatus.OK.code)
    .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `inserted`));
};
