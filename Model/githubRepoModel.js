import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/githubRepoListInfo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to mongo db');
});
//repoName, ownerName, description, starsCount, repoUrl
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    //unique: [true, 'Repo Already Exist'],
  },
  repoName: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  description: {
    type: String,
  },
  starsCount: {
    type: String,
  },
  repoUrl: {
    type: String,
  },
});

const githubRepoListInfo = mongoose.model('githubRepoList', userSchema);
module.exports = githubRepoListInfo;
