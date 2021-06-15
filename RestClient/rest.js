import axios from 'axios';
import util from 'util';
import repoInfoModel from '../Model/gitRepoObject';

const getGenericResponse = async (response) => {
  const githInfoArray = [];
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
};

module.exports = {
  request: async (restData, restMethod) => {
    const wsUrl = ` https://api.github.com/users/${restData.username}/repos`;
    console.log('inside of rest:', restData, restMethod, wsUrl);

    switch (restMethod) {
      case 'GET': // all get req would be here
        // eslint-disable-next-line no-return-await
        return await axios
          .get(wsUrl, { headers: { 'Content-Type': 'application/json' } })
          // eslint-disable-next-line arrow-body-style
          .then(async (response) => {
            console.log('github response:', response);
            // eslint-disable-next-line no-return-await
            return await getGenericResponse(response);
          })
          .catch((err) => {
            console.log('rest error:', err.message);
            return err;
          });
      case 'POST': // all post req would be here
        // eslint-disable-next-line no-return-await
        return await axios
          .post(wsUrl, restData.data, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            console.log(
              'git response:',
              util.inspect(response.data, false, null, true /* enable colors */)
            );
            return response.data;
          })
          .catch((error) => {
            console.log(
              'git error response:',
              util.inspect(
                error.response.data,
                false,
                null,
                true /* enable colors */
              )
            );

            return error.response.data;
          });
      default:
        break;
    }
  },
};
//getBalance: data => restClient.request('balanceInquiry', { data }, 'POST'),//rest request of git Balance Inquiry
