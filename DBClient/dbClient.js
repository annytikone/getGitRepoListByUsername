import githubRepoListInfo from '../Model/githubRepoModel';

let docData;

module.exports = {
  findRepoList: async (username, sort) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    await githubRepoListInfo.find({ [sort]: username }, (_err, docs) => {
      docData = docs;
      return docData;
    }),

  saveData: async (data) => await githubRepoListInfo.create(data),
};
