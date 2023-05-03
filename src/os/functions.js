import fs from 'fs';

import db from '../db/mysql.config.js';

export function readfile(rawdata) {

  rawdata = fs.readFileSync(rawdata);
  let data = JSON.parse(rawdata);

  return data;
}

