function repoInfoModel(
  id,
  repoName,
  ownerName,
  description,
  starsCount,
  repoUrl
) {
  this.id = id;
  this.repoName = repoName;
  this.ownerName = ownerName;
  this.description = description;
  this.starsCount = starsCount;
  this.repoUrl = repoUrl;
}
module.exports = repoInfoModel;
