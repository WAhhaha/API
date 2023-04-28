import HttpStatus from "../utils/HttpStatus.js";
import Response from "../utils/response.js";
import logger from "../utils/logger.js";
import crypto from 'crypto';

import database from "../db/mysql.config.js";
import QUERY from "../db/mysql.query.js";
import { createAnalyzeResults, insertPTTdata } from "../dm/dm.system.js";

export const getFlag = (req, res) => {

  let flag = {
    content: `this is your flag`,
  };

  let reqId = crypto.randomBytes(12).toString('hex');

  res.status(HttpStatus.OK.code)
    .send(new Response(reqId, HttpStatus.OK.code, HttpStatus.OK.status, `Flag fetched`, flag));
};

export const insertPTT = (req, res) => {

  insertPTTdata('/home/ahhaha9191/Documents/SAproject/API/src/json/content.json', (err, result) => {

    if(err) {

      logger.err(err.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred(insertPTT)`));
    } else {

      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `action completed(insertPTT)`));
    }
  });
};

export const CreateTargetAnalyze = (req, res) => {

  let reqId = crypto.randomBytes(12).toString('hex');
  
  createAnalyzeResults(reqId , Object.values(req.body), res, (err) => {
    
    if(err) {

      logger.err(err.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(reqId, HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred at creating target analyze`));
    }

      res.status(HttpStatus.CREATED.code)
        .send(new Response(reqId, HttpStatus.CREATED.code, HttpStatus.CREATED.status, `target analyzing results created`));
    console.log(`test`);
  });
};
