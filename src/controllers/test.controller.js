import HttpStatus from "../HttpStatus.js";
import Response from "../response.js";
import logger from "../logger.js";

export const getFlag = (req, res) => {

  res.status(HttpStatus.OK.code)
    .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Flag fetched`, 'this is your flag!'));
};
