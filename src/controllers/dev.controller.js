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

export const testPostData = (request ,response) => {

  logger.info(`${request.method}, ${request.originalUrl}, posting a data`);
  
  let data = request.body;
  console.log(data);

  response.status(HttpStatus.CREATED.code)
    .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `data posted`, data));
};

export const insertExampleData = (request, response) => {

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
  db.query('CALL insert_title_content(?, ?, ?, ?)', Object.values(request.body), (err, results) => {

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
