import db from '../mysql.config.js';
import {readfile} from './filesystem.js';
import QUERY from '../query/sap.query.js';

export function insertTitle(data){

  let title = {
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

export function insertContent(data){

  return new Promise((resolve) => {

    db.query(QUERY.SELECT_last_titleId, (err, res) => {

      if(err) throw err;
      if(res){

        let content = {
          titleId: res[0].lastId,
          content: data.Contents,
        };

        db.query(QUERY.ADD_contents, Object.values(content), (err, res) => {

          if(err) throw err;
          resolve(res);
        });
      }
    });
  });

}

export function waiting(time){

  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, time);
  });
}

export function getLastId() {

  return new Promise((resolve, reject) => {
    
    db.query(QUERY.SELECT_last_titleId, (err, result) => {
      
      if(err) reject (err);
      resolve(result);
    });
  });
}
