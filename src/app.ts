import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import config from 'config';
import log from "./logger";
import connect from './db/connect'
import routes from './routes'
import { deserializeUser } from "./middleware";
import enableCors from './middleware/enableCors';

const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();
app.use(enableCors);
app.use(deserializeUser)
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.listen(port, host, () => {
    log.info(`server is listening at http://${host}:${port}`);
    connect();
    routes(app);
} )