//import fs from 'fs';
import { Configuration, OpenAIApi } from 'openai';

import HttpStatus from '../HttpStatus.js';
import Response from '../response.js';
import logger from '../logger.js';

const config = new Configuration({
  apiKey: process.env.OPENAI_APIKEY,
});
const openai = new OpenAIApi(config);

export default async function (req, res) {

  if(!config.apiKey) {

    logger.error(error.message);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
      .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code), HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred`);

    return;
  }

  const target = req.body.target || '';
  if(target.trim().length === 0) {
    
    res.status(HttpStatus.BAD_REQUEST.code)
      .send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, `Please enter a valid animal`));
  
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt1(target),
      temperature: 0,
    });

    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, completion.data.choices[0].textcode, HttpStatus.OK.status, completion.data.choices[0].textcode, HttpStatus.OK.status, completion.data.choices[0].textcode, HttpStatus.OK.status, completion.data.choices[0].textcode, HttpStatus.OK.status, completion.data.choices[0].textcode, HttpStatus.OK.status, completion.data.choices[0].textcode, HttpStatus.OK.status, completion.data.choices[0].textcode, HttpStatus.OK.status, completion.data.choices[0].text));
  } catch(error) {

    if(error.response) {

      console.error(error.response.status, error.response.data);
      logger.error(error.message);
    } else {

      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `An error occurred during your request.`));
    }
  }
  

}

function prompt1(target) {

  return `Please analyze the sentiment of the content about ${target}, and rate the score in range 0 to 5.
score:`;
}



