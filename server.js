import express from 'express';
import routes from './Routes/getGitRepoList';
import bodyParser from 'body-parser';
import { handleError } from './ErrorHandler/error';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, () => {
  console.log('App is running on 3000');
});

app.use('/v1/gitApp/', routes);

app.use(async (err, req, res, next) => {
  console.log('Fired this api:->: %s %s ', await req.url, await req.meth);
  handleError(err, res);
});
