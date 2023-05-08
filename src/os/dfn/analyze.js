import { Configuration, OpenAIApi } from 'openai';


const config = new Configuration({
  apiKey: '',
});
const openai = new OpenAIApi(config);

export default async function(target, content) {
/*
  if(!config.apiKey) {

      console.log(`Wrong APIKey`);
    
      return;
  } 

  if(content.length > 1000) return -1;

  
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt(target, content),
    temperature: 0,
    max_tokens: 1000,
  });
  
  let data = JSON.parse(completion.data.choices[0].text);
*/
  let sentiment = {
    //score: data.score,
    //answer: data.answer,
    score: Math.random() * 5,
  };

  if(sentiment.score == -10) return false;
  return sentiment;
}

function prompt(target, content) {

  return `請將以下的資料，進行情緒與"薩爾達傳說"的正負面評分，評分標準0~5，若內容與"薩爾達傳說"無關則為-1。
資料格式以{"score":{評分}}

${content}`;
}
