import HttpStatus from "../utils/HttpStatus.js";
import Response from "../utils/response.js";
import logger from "../utils/logger.js";
import crypto from 'crypto';

import db from "../db/mysql.config.js";
import QUERY from "../db/mysql.query.js";
import { createAnalyzeResults, insertPTTdata } from "../dm/dm.system.js";

export const getFlag = (req, res) => {

  let flag = {
    content: `this is your flag`,
  };

  res.status(HttpStatus.OK.code)
    .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Flag fetched`, flag));
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
 
  createAnalyzeResults(Object.values(req.body), res);
};

export const GetAnalyzeResults = (req, res) => {
  
  db.query('SELECT * FROM sentiments', (err, results) => {

    if(err) {
      
      logger.err(err.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred selecting sentimtents`));
    }

    if(!results) {

      res.status(HttpStatus.NO_CONTENT.code)
        .send(new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, `no sentiment has found`));
    } else {

      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `sentiments fetched`, results));

      db.query('TRUNCATE TABLE sentiments');
    }
  });
};
