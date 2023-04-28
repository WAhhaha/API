import db from '../db/mysql.config.js';
import QUERY from "../db/mysql.query.js";

import analyze from "../functions/analyze.js";
import { readfile } from "../functions/filesystem.js";

import HttpStatus from '../utils/HttpStatus.js';
import { insertTitle, getLastId, insertContent, selectContent} from "./dm.functions.js";
import Response from '../utils/response.js';
import logger from '../utils/logger.js';

export async function insertPTTdata(path) {

  let file = readfile(path);
  let res = '';

  for(let i = 0; i < file.PTT.length; i++) {

    let data = file.PTT[i];
    let src = 'PTT';

    res = await insertTitle(src, data)
    .then(() => getLastId())
    .then((result) => insertContent(data, result[0].lastId));
  }
}


export async function createAnalyzeResults(target, res) {

  var result = '';
  result = await new Promise((resolve) => {
    
    db.query('SELECT MAX(contentId) AS lastId FROM contents', (err, result) => {

      if(err) {

        logger.err(err.message);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred at selecting max(contentId)`));
      }

      if(!result) {

        res.status(HttpStatus.NO_CONTENT.code)
          .send(new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, `no content has found`));
      } else {

        resolve(result);
      }
    });
  });

  let lastId = result[0].lastId;
  result = '';
  for(let i = 1; i <= lastId; i++) {

    let result = await new Promise((resolve) => {

      db.query('SELECT content, titleId FROM contents WHERE contentId = ?', i, (err, result) => {

        if(err) {
          
          logger.err(err.message);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred at selecint contents`));
        }

        if(!result) {

          res.status(HttpStatus.NO_CONTENT.code)
            .send(new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, `no content has found`));
        } else {

          resolve(result);
        }
      });
    });

    let content = {
      titleId: result[0].titleId,
      content: result[0].content,
    };

    result = await analyze(target, content.content);
    
    let sentiment = {
      titleId: content.titleId,
      score: result.score,
    };

    result = await new Promise((resolve) => {

      db.query('INSERT INTO sentiments(titleId, score) VALUES(?, ?)', Object.values(sentiment), (err, result) => {

        if(err) {

          logger.err(err.message);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred at inserting setiment results`));
        } else {

          resolve(result);
        }
      });
    });
  }

  res.status(HttpStatus.CREATED.code)
    .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `analyze results created`));

}



