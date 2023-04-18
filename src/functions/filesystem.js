import fs from 'fs';

export function readfile(rawdata){

    rawdata = fs.readFileSync(rawdata);
    let data = JSON.parse(rawdata);

    return data;
}
