import { serv } from './server.js';
import 'dotenv/config';

const port = process.env.PORT || 3000;
serv.listen(port, () => console.log(`Started on ${port}`));
