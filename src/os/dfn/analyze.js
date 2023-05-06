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
    answer: "test answer",
  };

  if(sentiment.score == -1) return false;
  return sentiment;
}

function prompt(target, content) {

  return `Please evaluate the sentiment towards "${target}" based on the provided data. The rating scale is from 0 to 5. 
Provide appropriate answers based on the questions within the article. 
If the article is unrelated to "${target}", rate it as -1 and provide an answer as -1.
  
The data format is {"score": rating, "answer": "response"}

${content}`;
}
