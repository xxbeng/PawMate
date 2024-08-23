// openAiService.js contains the logic for interacting with the OpenAI API.
import OpenAI from 'openai';

// Ask GPT-3.5 for the top 5 dog walking parks near a location
export const askGptPlacesToWalkADog = async ({ lat, lon }) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return [
      {
        name: 'No Api Key Provided Mock 1',
        distancesByWalk: 2,
        distancesByCar: 1.5,
        timeByWalk: 30,
        timeByCar: 10
      },
      {
        name: 'No Api Key Provided Mock 2',
        distancesByWalk: 2,
        distancesByCar: 1.5,
        timeByWalk: 30,
        timeByCar: 10
      },
      {
        name: 'No Api Key Provided Mock 3',
        distancesByWalk: 2,
        distancesByCar: 1.5,
        timeByWalk: 30,
        timeByCar: 10
      }
    ];
  }

  // Create a new OpenAI instance with the API key
  const openai = new OpenAI({ apiKey });
  // Ask GPT-3.5 for the top 5 dog walking parks near a location
  const question = `Please provide an array of objects detailing popular top 5 dog walking parks near at lat ${lat} and lon ${lon}, including {name, distancesByWalk, distancesByCar, timeByWalk, and timeByCar} for an api response. Distances in km, and time in minutes`;
  try {
    const completionResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful editing assistant. Only return the summary without additional information or feedback.'
        },
        { role: 'user', content: question }
      ]
    });

    // Parse the response from GPT-3.5
    const response = completionResponse.choices[0].message.content.trim();
    console.log('CAME TO CALL CHAT GPT ::::::::::::::::::::::::::::::');
    return JSON.parse(response);
  } catch (error) {
    console.error('Error with OpenAI API:', error.message, error.stack);
  }
};
