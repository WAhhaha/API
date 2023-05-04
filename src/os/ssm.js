import db from '../db/mysql.config.js';

import analyze from "./dfn/analyze.js";

import HttpStatus from '../utils/HttpStatus.js';
import Response from '../utils/response.js';
import logger from '../utils/logger.js';

export async function analyzing (response, target) {

  var result = '';
  result = await new Promise((resolve) => {
    
    db.query('SELECT MAX(contentId) AS lastId FROM contents', (err, result) => {

      if(err) {

        logger.error(err.message);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred at selecting max(contentId)`));
      }

      if(!result) {

        response.status(HttpStatus.NO_CONTENT.code)
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
          
          logger.error(err.message);
          response.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred at selecint contents`));
        }

        if(!result) {

          response.status(HttpStatus.NO_CONTENT.code)
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

    if(!result) continue;
    
    let sentiment = {
      titleId: content.titleId,
      score: result.score,
    };

    result = await new Promise((resolve) => {

      db.query('INSERT INTO sentiments(titleId, score) VALUES(?, ?)', Object.values(sentiment), (err, result) => {

        if(err) {

          logger.error(err.message);
          response.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred at inserting setiment results`));
        } else {

          resolve(result);
        }
      });
    });
  }

  response.status(HttpStatus.CREATED.code)
    .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `sentiments analyzment done`));

}

