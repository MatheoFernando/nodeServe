import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import databaseConnect from './db.js';
import { newDescarte } from './controllers/newDescarte.controller.js';
import { newPickup } from './controllers/pickup.controller.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  return res.status(200).send({ message: 'Everything is OK!' });
});

app.post('/new-descarte', newDescarte);

app.post("/new-pickup", newPickup)

databaseConnect();

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
export default app