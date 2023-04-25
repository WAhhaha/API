import HttpStatus from "../utils/HttpStatus.js";
import Response from "../utils/response.js";
import logger from "../utils/logger.js";
import database from "../db/mysql.config.js";
import QUERY from "../db/mysql.query.js";
import analyze from "../functions/analyze.js";
import { getLastId } from "../dm/dm.functions.js";
import { callAnalyzing, insertPTTdata } from "../dm/dm.system.js";

export const getFlag = (req, res) => {

  res.status(HttpStatus.OK.code)
    .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Flag fetched`, 'this is your flag!'));
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

export const targetAnalyze = (req, res) => {
  
  callAnalyzing(Object.values(req.body), (err, result) => {
    
    if(!result) {

      logger.err(err.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred(targetAnalyze)`));
    } else {

      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `action completed(targetAnalyze)`));
    }
  });
};
