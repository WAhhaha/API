import database from '../mysql.config.js';
import QUERY from '../query/sap.query.js';
import logger from '../logger.js';
import { readfile } from './filesystem.js';

export default async function(path){

  let file = readfile(path);
  for(let i = 0; i < file.PTT.length; i++){

    let data = file.PTT[i];

    let datatitles = {
      title: JSON.stringify(data.Title),
      url: JSON.stringify(data.Url),
    };

    let datacontents = {
      titleId: i,
      content: JSON.stringify(data.Contents)
    }

    database.query(QUERY.ADD_titles, Object.values(datatitles), (error, results) => {

      if(!results)  logger.error(error.message);
    });

    database.query(QUERY.ADD_contents, Object.values(datacontents), (error, results) => {

      if(!results)  logger.error(error.message);
    })
  }
}
