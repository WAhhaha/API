import db from '../db/mysql.config.js';
import QUERY from "../db/mysql.query.js";
import analyze from "../functions/analyze.js";
import { readfile } from "../functions/filesystem.js";
import { insertTitle, getLastId, insertContent, selectContent } from "./dm.functions.js";

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

export async function callAnalyzing(target) {

  var result = '';
  result = await new Promise((resolve) => {
    
    db.query('SELECT MAX(contentId) AS lastId FROM contents', (err, result) => {

      if(err) throw err;
      resolve(result);
    });
  });

  let lastId = result[0].lastId;
  result = '';
  for(let i = 1; i <= lastId; i++) {

    let result = await new Promise((resolve) => {

      db.query('SELECT content, titleId FROM contents WHERE contentId = ?', i, (err, result) => {

        if(err) throw err;
        resolve(result);
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

        if(err) throw err;
        resolve(err);
      });
    });
  }
}



