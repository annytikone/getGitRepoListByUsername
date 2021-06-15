import githubRepoListInfo from '../Model/githubRepoModel';

let docData;

module.exports = {
  findRepoList: async (username) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    await githubRepoListInfo.find({ ownerName: username }, (_err, docs) => {
      docData = docs;
      return docData;
    }),

  saveData: async (data) => await githubRepoListInfo.create(data),
};
