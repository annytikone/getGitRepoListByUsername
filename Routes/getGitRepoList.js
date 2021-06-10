/* eslint-disable no-console */
import express from 'express';
import axios from 'axios';
import CircularJSON from 'circular-json';
import githubRepoListInfo from '../Model/githubRepoModel';
import repoInfoModel from '../Model/gitRepoObject';
import { ErrorHandler } from '../ErrorHandler/error';

const router = express.Router();
let settings = { method: 'GET' };

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
  let githInfoArray = [];
  const { username } = req.body;
  const getGithubRepoListUrl = `https://api.github.com/users/${username}/repos`;
  let isData;
  const isDataPresent = await githubRepoListInfo.find(
    { ownerName: username },
    (err, docs) => {
      isData = docs;
      // console.log('docs', docs);
      return isData;
    }
  );

  if (isData.length > 1) {
    console.log('data is already present in mongo');
    res.json(isDataPresent);
  } else {
    console.log('data is not present in mongo hence adding');
    const getList = await axios(getGithubRepoListUrl, settings)
      .then(async (response) => {
        for (let i = 0; i < response.data.length; i++) {
          githInfoArray.push(
            // eslint-disable-next-line new-cap
            new repoInfoModel(
              response.data[i].id,
              response.data[i].name,
              response.data[i].owner.login,
              response.data[i].description,
              response.data[i].stargazers_count,
              response.data[i].html_url
            )
          );
        }
        return githInfoArray;
      })
      .catch((err) => {
        console.log('axios error:', err.message);
        // res.json(err);
        //        next(err);
        //      return err;
        res.json({
          status: 404,
          message: `NOT FOUND:${err.message}`,
          data: [],
        });
      });

    /*  if (getList.message.includes('404')) {
      console.log('includes gitapi:', getList.message);

      throw new ErrorHandler(403, 'Bad Request:Empty Values');
    }
*/
    const mongoInsertedData = await githubRepoListInfo.create(getList);
    res.json(mongoInsertedData);
  }
});

//const circularJsonToStringify = CircularJSON.stringify(getList);

//res.json(JSON.parse(circularJsonToStringify));
module.exports = router;
