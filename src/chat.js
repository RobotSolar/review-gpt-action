const { Configuration, OpenAIApi } = require("openai");

export class Chat {
  constructor(apiKey) {
    const configuration = new Configuration({
      apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }

  generatePrompt = (patch, ext) => {
  return `Bellow is the code patch, please help me do a brief code review, Answer me in ${ process.env.LANG || 'english' } if any bug risk or code smell is found and improvement suggestion are welcome, don't add repeat information or add resume or introduction in the answer, be short and concise. 
  ${patch}
`;
  };

  codeReview = async (patch, ext) => {
    const prompt = this.generatePrompt(patch,);

    const { data } = await this.openai.createChatCompletion({
      model: process.env.MODEL || "gpt-3.5-turbo",
      temperature: +(process.env.temperature || 0) || 1,
      top_p: +(process.env.temperature || 0) || 1,
      messages: [{ role: "user", content: prompt }],
    });
    return data.choices[0];
  };
}
