import db from '../db/mysql.config.js';
import QUERY from '../db/mysql.query.js';
import analyze from '../functions/analyze.js';

export function insertTitle(src, data){

  let title = {
    source: src,
    title: data.Title,
    url: data.Url,
  };

  return new Promise((resolve) => {

    db.query(QUERY.ADD_titles, Object.values(title), (err, result) => {

      if(err) throw err;
      resolve(result);
    });
  });
}


export function getLastId() {

  return new Promise((resolve) => {
    
    db.query(QUERY.SELECT_last_titleId, (err, result) => {
      
      if(err) throw err;
      resolve(result);
    });
  });
}

export function insertContent(data, lastId) {

  let content = {
    titleId: lastId,
    content: data.Contents,
  };

  return new Promise((resolve) => {

    db.query(QUERY.ADD_contents, Object.values(content), (err, result) => {

      if(err) throw err;
      resolve(result);
    });
  });
}

export function selectContent(id) {

  return new Promise((resolve) => {

    db.query(QUERY.SELECT_content, id, (err, result) => {

      if(err) throw err;
      resolve(result);
    });
  });
}

export function insertSentiment(data) {

  let sentiment = {
    titleId: data.titleId,
    score: data.score,
  };

  return new Promise((resolve) => {

    db.query(QUERY.ADD_sentiments, Object.values(sentiment), (err, result) => {

      if(err) throw err;
      resolve(result);
    });
  });
}

