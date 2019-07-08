const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const querystring = require('querystring');

const app = express();
const client_id = '7c8b8bec741244df8ee854c4e1794ad7' // Your client id
const client_secret = 'f3c7029d1a054da48c704e2342fed0a8' // Your secret
const redirect_uri = 'http://localhost:3000/callback' // Your redirect uri

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(bodyParser.json());

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get('/', (req, res) => {
  res.json('hello');
})

app.get('/login', (req, res) => {
  var state = generateRandomString(16);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-top-read playlist-modify-public playlist-modify-private';
  var windowLocation = res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));

})

app.listen(process.env.PORT || 3001, () => {
  console.log(`app is running on port ${process.env.PORT}`);
})