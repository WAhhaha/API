import { response } from 'express';
import { Configuration, OpenAIApi } from 'openai';

import logger from '../utils/logger.js';

const config = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(config);

export default async function(target, content) {

  if(!config.apiKey) {

      console.log(`Wrong APIKey`);
    
      return;
  } 

  if(content.length > 1000) return -1;

  try{

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt(target, content),
      temperature: 0,
    });

    return completion.data.choices[0].text;

  } catch(error) {

    if(error.response){

      logger.info(response.status);
      logger.info(response.data);
    } else {

      logger.error(error.messege);
    }
  }

  return -1;
}

function prompt(target, content) {

  return `請幫我分析以下文章對於${target}的正負面分數，分數為0到5並準確取至小數點後1位，如果文章與${target}無關則輸出-1：
 
範例文章:
這是一篇範例文章。

正負面分數：-1

範例文章2:
這是一篇推薦${target}的文章。

正負面分數：3.5

文章：
${content}

正負面分數:`;
}
