import express from 'express';
import body from 'body-parser';
import './config/db';
import './middlewares/auth';
import cors from './config/cors';
import route from './routes/route';
import publicRoutes from './routes/publicRoutes';
import privateRoutes from './routes/privateRoutes';

const app = express();

app.use(cors);
app.use(body.json({ limit: '30mb' }));
app.use(body.urlencoded({ limit: '30mb', extended: true }));

app.use(express.static(require('path').join(__dirname, '/src/files')));

app.use(route);
app.use(publicRoutes)
app.use(privateRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server online on port ${process.env.PORT} `);
});
