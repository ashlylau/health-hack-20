import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

const express = require('express')
const app = express()
const port = 3000

const checkpoints = [{
  "location": "ethos",
  "coordinates": [51.4995933,-0.1748108]
},{
  "location": "huxley",
  "coordinates": [51.4987292,-0.1798479]
},{
  "location": "vna",
  "coordinates": [51.4966394,-0.1790966]
},{
  "location": "rcm",
  "coordinates": [51.4993981,-0.177944]
},{
  "location": "queenstower",
  "coordinates": [51.4983175,-0.1772704]
},{
  "location": "saf",
  "coordinates": [51.497711,-0.176977]
}];

var currCheckpoints = [
  {
    "location": "saf",
    "coordinates": [51.497711,-0.176977]
  },{
    "location": "huxley",
    "coordinates": [51.4987292,-0.1798479]
  }
];

var leaderboard = [
  {
    "user": "abc",
    "scores": 0
  },{
    "user": "def",
    "scores": 0
  }  
]

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/reachedCheckpoint', function(req, res) {
  var reachedLocation = req.query.location;
  var user = req.query.user;
  var score = req.query.score;
  // generate new checkpoint
  // update new checkpoint for all users
  addCheckpoint();
  // remove checkpoint for all users
  removeCheckpoint(reachedLocation);
  // update points for curr user
  updateLeaderboard(user, score);
  res.send(currCheckpoints);
})

app.get('/getLeaderboard', function(req, res) {
  // return json of curr leaderboard
  res.send(leaderboard)
})

function generateCheckpoint() {
  var index = Math.floor(Math.random()*checkpoints.length)
  return checkpoints[index];
}

function addCheckpoint() {
  do {
    var checkpoint = generateCheckpoint();
  } while (currCheckpoints.includes(checkpoint));
  currCheckpoints.push(checkpoint);
}

function removeCheckpoint(location) {
  for (var i = 0; i < currCheckpoints.length; i++) {
    if (currCheckpoints[i].location===location) {
      currCheckpoints.splice(i, 1);
    }
  }
}

function updateLeaderboard(user, score) {
  var userObj = leaderboard.find(elem => elem.user==user);
  userObj.scores += parseInt(score);
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
