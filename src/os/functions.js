import fs from 'fs';

import db from '../db/mysql.config.js';
import QUERY from '../db/mysql.query.js';

export function readfile(rawdata) {

  rawdata = fs.readFileSync(rawdata);
  let data = JSON.parse(rawdata);

  return data;
}

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