import express from 'express';

const pttRoutes = express.Router();

pttRoutes.route('/result');
pttRoutes.route('/results');

export default pttRoutes;
