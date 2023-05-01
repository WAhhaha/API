import logger from '../utils/logger.js';
import HttpStatus from '../utils/HttpStatus.js';
import Response from '../utils/response.js';

import { analyzing } from '../os/ssm.js';

import db from '../db/mysql.config.js';

export const createAnalysis = (request, response) => {

  logger.info(`${request.method}, ${request.originalUrl}, analyzing the sentiments for the contents`);

  let data = request.body;

  analyzing(response, data.target);
};

export const getSentiments = (request, response) => {

  logger.info(`${request.method}, ${request.originalUrl}, fetching sentiment results`);

  db.query('CALL get_sentiments', (err, results) => {

    if(err) {

      logger.err(err.message);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred(getSentiments)`));
    }

    if(!results) {

      response.status(HttpStatus.NO_CONTENT.code)
        .send(new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, `sentiments is empty`));
    } else {

      let data1 = results;
      response.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `sentiments fetched`, data1));
    }
  });
};
