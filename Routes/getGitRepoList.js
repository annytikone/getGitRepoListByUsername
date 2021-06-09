import express from 'express';
import axios from 'axios';
import CircularJSON from 'circular-json';

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

router.post('/getGithRepoList', async (req, res) => {
  const { username } = req.body;
  const getGithubRepoListUrl =
    'https://api.github.com/users/' + username + '/repos';

  console.log('url link:', getGithubRepoListUrl);

  const getList = await axios(getGithubRepoListUrl, settings)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log('axios error:', err);
      return err;
    });

  const circularJsonToStringify = CircularJSON.stringify(getList);

  res.json(JSON.parse(circularJsonToStringify));
});

module.exports = router;
