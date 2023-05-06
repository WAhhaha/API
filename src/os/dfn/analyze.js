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
    max_tokens: 512,
  });
  
  let data = JSON.parse(completion.data.choices[0].text);
  */

  let sentiment = {
    //score: data.score,
    //answer: data.answer,
    score: Math.random() * 5,
    answer: "test answer",
  };

  if(sentiment.score == -1) return false;
  return sentiment;
}

function prompt(target, content) {

  return `請將以下的資料，進行情緒與"${target}"的正負面評分，評分標準0~5，並且根據文章內的提問給出適當的回答，若文章與"${target}"無關則評分為-1且回答為-1。
資料格式為{"score":評分 , "answer":"回答"}

${content}`;
}
