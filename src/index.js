import express from 'express';
import dotenv from 'dotenv';
import ip from 'ip';
import cors from 'cors';

import Response from './utils/response.js';
import HttpStatus from './utils/HttpStatus.js';
import logger from './utils/logger.js';

import testRoutes from './routes/test.routes.js';

import { insertContent, insertTitle } from './functions/dataInsert.js';
import {readfile} from './functions/filesystem.js';


dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/test', testRoutes);
app.get('/', (req, res) => res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'SAproject API with openai, v1.0.0, working well')));

app.listen(PORT, () => logger.info(`Server running on: ${ip.address()}:${PORT}`));


let file = readfile('/home/ahhaha9191/Documents/SAproject/API/src/json/content.json');
let result = '';

for(let i = 0; i < file.PTT.length; i++){

  result = await insertTitle(file.PTT[i]);
  result = await insertContent(file.PTT[i]);
}


