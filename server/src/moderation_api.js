import axios from 'axios'
import event from 'events'
event.EventEmitter.defaultMaxListeners=50;

const apiKey = 'mdx2FwcvOzAx5D3Nz56iIDb3Db6Wnt8h';
const base_url = 'https://api.deepinfra.com/v1/openai';

const stream = true; // or false

const MODEL_DI = 'mistralai/Mixtral-8x7B-Instruct-v0.1';



const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`,
};

const axiosInstance = axios.create({
  baseURL: base_url,
  headers: headers,
  responseType: 'stream',
});

let dataBuffer = '';
let message = "";
const handleStreamData = (chunk) => {
  dataBuffer += chunk.toString();

  // Check if the buffer contains a complete JSON object
  const jsonObjects = dataBuffer.substring(5,dataBuffer.length);
  if (jsonObjects.length > 1) {
    if(!jsonObjects.includes("DONE")){
      try{
      const event = JSON.parse(jsonObjects);
      
      message += event.choices[0].delta.content; //guarda cada parte de la respuesta
      }catch(error){

      }
    }
    dataBuffer = '';
  }
};



async function moderar(post) {
  const requestData = {
    model: MODEL_DI,
    messages: [
      { role: 'user', content: "Sos un filtro para moderar contenido por favor solo responde en formato json con cuan apropiado (del 0 al 100, no se permiten insultos) es el siguiente post en un contexto de listado de tiendas y usuarios: formato= { apropiado: xx, motivo:xx} Mensaje: " + post }
    ],
    stream: stream,
    max_tokens: 1000,
  };

  try {
    message="";
    const response = await axiosInstance.post('/chat/completions', requestData);
    const stream = response.data;

    console.log(requestData.messages[0].content);

    return new Promise((resolve, reject) => {
      stream.on('data', (data) => {
        // Assuming `handleStreamData` is a function that updates the message variable
        handleStreamData(data);
      });

      stream.on('end', () => {
        try {
          message = "{" + message.split('undefined')[0].split('{')[1]; // Remove trailing 'undefined'
          console.log(message);
          const parsedResult = JSON.parse(message.trim());
          console.log(parsedResult);
          resolve(parsedResult);
        } catch (parseError) {
          //console.error('JSON Parse Error:', parseError);
          reject(parseError);
        }
      });

      stream.on('error', (error) => {
        //console.error('Stream Error:', error);
        reject(error);
      });
    });
  } catch (error) {
    //console.error('API Error:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error to indicate the failure of the asynchronous operation
  }
}

async function moderarWithRetry(post, maxRetries = 3, retryDelay = 1000) {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      // Attempt the operation
      const result = await moderar(post);
      return result;
    } catch (error) {
      console.error(`Attempt ${retries + 1} failed. Retrying in ${retryDelay / 1000} seconds. Error:`, error);
      retries++;

      // Wait for a specified delay before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }

  // If all retries fail, throw the last error
  throw new Error(`Failed after ${maxRetries} attempts.`);
}


export {moderar, moderarWithRetry};
