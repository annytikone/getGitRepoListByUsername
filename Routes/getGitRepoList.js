/* eslint-disable no-console */
import express from 'express';
import axios from 'axios';
import CircularJSON from 'circular-json';
import githubRepoListInfo from '../Model/githubRepoModel';
import repoInfoModel from '../Model/gitRepoObject';
import { ErrorHandler } from '../ErrorHandler/error';
import dbClient from '../DBClient/dbClient';
import rest from '../RestClient/rest';

const router = express.Router();

const settings = { method: 'GET' };

router.get('/test', async (req, res) => {
  const getGithubRepoListUrl =
    'https://api.github.com/users/' + 'annytikone' + '/repos';

  const getList = await axios(getGithubRepoListUrl, settings).then(
    (response) => response
  );

  const circularJsonToStringify = CircularJSON.stringify(getList);

  res.json(JSON.parse(circularJsonToStringify));
});

router.post('/getGithRepoList', async (req, res, next) => {
  const { username } = req.body;
  try {
    const isDataPresent = await dbClient.findRepoList(username);

    if (isDataPresent.length > 1) {
      console.log('data is already present in mongo');
      res.json(isDataPresent);
    } else {
      console.log('data is not present in mongo hence adding');
      const getList = await rest.request(req.body, 'GET');

      if (!getList[0]) {
        throw new ErrorHandler(404, 'USER NOT FOUND');
      }
      const mongoInsertedData = await dbClient.saveData(getList);
      res.json(mongoInsertedData);
    }
  } catch (err) {
    console.log('catch err', err);
    next(err);
  }
});

module.exports = router;
