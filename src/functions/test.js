import db from '../mysql.config.js';
import {readfile} from './filesystem.js';
import QUERY from '../query/sap.query.js';

export async function insertData(filepath){
  
  let file = readfile(filepath);
  
  for(let i = 0; i < file.PTT.length; i++){

    let data = file.PTT[i];
    let titleData = {
      title: JSON.stringify(data.Title),
      url: JSON.stringify(data.Url),
    };

    db.query(QUERY.ADD_titles, Object.values(titleData), (err) => {
      
      if(err) throw err;

      db.query(QUERY.SELECT_last_titleId, (err, res) => {
        
        if(err) throw err;
        if(res){

          let contentData = {
            titleId: res[0].lastId,
            content: JSON.stringify(data.Contents),
          };

          db.query(QUERY.ADD_contents, Object.values(contentData));
        }
      })
    });

  }
}
