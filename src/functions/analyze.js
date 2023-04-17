import { Configuration, OpenAIApi } from 'openai';
import { readfile } from './filesystem.js';

const config = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(config);

export default async function(target) {

    if(!config.apiKey) {

        console.log(`Wrong APIKey`);
    
        return;
    }

    target = readfile(target);
    console.log(target.PPT.length);

    
    for(var i = 0; i < target.PPT.length; i++){

      var content = target.PPT[i].Contents;
      console.log(`${i}: content length=${content.length}`);
      if(content.length > 700){

        console.log(-1);
        continue;
      }

      let result = await getCompletion(content);
      console.log(`score: ${result}`);
    }
    

    console.log('end');
}

function prompt(target) {

    return `請幫我分析以下文章的正負面分數，分數為0到5並準確取至小數點後1位：
範例文章：
這是一篇範例文章。

正負面分數：2.5

文章：
${target}

正負面分數:`;
}

async function getCompletion(target) {

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt(target),
    temperature: 0,
  });

  return completion.data.choices[0].text;
}