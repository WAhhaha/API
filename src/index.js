import express from 'express';
import dotenv from 'dotenv';
import ip from 'ip';
import cors from 'cors';
import fetch from 'node-fetch';

import Response from './response.js';
import HttpStatus from './HttpStatus.js';
import logger from './logger.js';

import pttInsert from './functions/ptt.insert.js';
import testRoutes from './routes/test.routes.js';


dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/test', testRoutes);
app.get('/', (req, res) => res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'SAproject API with openai, v1.0.0, working well')));

app.listen(PORT, () => logger.info(`Server running on: ${ip.address()}:${PORT}`));

//await pttInsert('/home/ahhaha9191/Documents/SAproject/API/src/json/content.json');
