import HttpStatus from "../HttpStatus.js";
import Response from "../response.js";
import logger from "../logger.js";
import database from "../mysql.config.js";
import QUERY from "../query/sap.query.js";
import analyze from "../functions/analyze.js";

export const getFlag = (req, res) => {

  res.status(HttpStatus.OK.code)
    .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Flag fetched`, 'this is your flag!'));
};

export const testanalyzing = (req, res) => {

  var maxtitles;
  
  database.query(QUERY.SELECT_MAX_titles, (error, results) => {
    
    if(!results){

      logger.error(error.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred(SELECT_MAX_titles)`));
    } else {

      maxtitles = results[0].maxtitles;
      logger.info(`maxtitles = ${maxtitles}`);
    }
  });

  for(let i = 1; i < maxtitles + 1; i++){

    let sentimentscore = 2.5;
    let objsentiemts = {
      titleId: i,
      score: sentimentscore,
    };

    database.query(QUERY.ADD_sentiments, Object.values(objsentiemts), (error, results) => {
      
      if(!results){

        logger.error(error.message);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred(ADD_sentiments)`));
      }
    });
  }

  database.query(QUERY.SELECT_AVG_sentimentscore, (error, results) => {

    if(!results){

      logger.error(error.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred(SELECT_AVG_sentimentscore)`));
    } else {

      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `action successful(SELECT_AVG_sentimentscore)`), results[0].averageScore);
    }
  });

  //let result = await getCompletion([req.params.target], content);
};
