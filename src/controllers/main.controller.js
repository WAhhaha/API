import logger from '../utils/logger.js';
import HttpStatus from '../utils/HttpStatus.js';
import Response from '../utils/response.js';

import db from '../db/mysql.config.js';
import analyze from '../os/dfn/analyze.js';


export const getSentiments = (request, response) => {

  logger.info(`${request.method}, ${request.originalUrl}, fetching sentiment results`);

  db.query('CALL get_sentiments', (err, results) => {

    if(err) {

      logger.error(err.message);
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

export const exeAnalyze = async (request, response) => {

  logger.info(`${request.method}, ${request.originalUrl}, executing analyzment`);
  
  let results = '';
  let waiting = '';

  results = await new Promise((resolve) => {

    db.query('SELECT * FROM contents', (err, results) => {

      if(err) {

        logger.error(err.message);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `cannot select titles and contents`));
      }

      if(!results) {

        response.status(HttpStatus.NO_CONTENT.code)
          .send(new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, `no contents`));
      } else {

        resolve(results);
      }
    });
  });

  let contents = results;
  for(let i = 0; i < contents.length; i++) {

    results = await analyze(request.body.target, contents[i].content);
    let sentiments = {
      titleId: contents[i].titleId,
      score: results.score,
      answer: results.answer,
    };

    waiting = await new Promise((resolve) => {

      db.query('INSERT INTO sentiments(titleId, score, answer) VALUES(?, ?, ?)', Object.values(sentiments), (err, results) => {

        if(err) {
          
          logger.error(err.message);
          response.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `inserting error`));
        }

        resolve(results);
      });
    });
  }

  response.status(HttpStatus.OK.code)
    .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `sentiments inserted`));
};

export const insertDataPackage = (request, response) => {

  logger.info(`${request.method}, ${request.originalUrl}, inserting datas`);

  let file = readfile('/home/ahhaha9191/Documents/SAproject/API/datafiles/json/content.json');
  for(let i = 0; i < file.PTT.length; i++) {

    let data = {
      src: 'PTT',
      title: file.PTT[i].Title,
      content: file.PTT[i].Contents,
      url: file.PTT[i].Url,
    };

    db.query('CALL insert_title_content(?, ?, ?, ?)', Object.values(data), (err, results) => {

      if(err) {
        
        logger.error(err.message);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred while inserting data`));
      }
    });

  }

  response.status(HttpStatus.CREATED.code)
    .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `inserted`));
};

export const insertData = (request, response) => {

  logger.info(`${request.method}, ${request.originalUrl}, inserting title and contents`);

  let data = {
    source: request.source,
    title:request.title,
    content: request.content,
    url: request.url,
  };

  db.query('CALL insert_title_content(?, ?, ?, ?)', Object.values(data), (err) => {

    if(err) {
      
      logger.error(err.message);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred while inserting data`));
    }

    response.status(HttpStatus.CREATED.code)
      .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `inserted`));
  });
};

export const getData = (request, response) => {

  logger.info(`${request.method}, ${request.originalUrl}, fetching data`);
  db.query('SELECT * FROM titles INNER JOIN contents ON titles.titleId = contents.titleId', (err, results) => {

    if(err) {
      
      logger.error(err.message);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred while fetching data`));
    }
    
    if(!results) {

      response.status(HttpStatus.NO_CONTENT.code)
        .send(new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, `no content`));
    } else {

      response.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `data fetched`, results));
    }
  });
};
