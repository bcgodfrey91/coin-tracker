const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const rp = require('request-promise');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/hello', (req, res, next) => {
  const options = {
    uri: 'https://api.coinmarketcap.com/v2/ticker/?convert=USD&limit=10',
    json: true
  }

  rp(options)
    .then((coins) => {
      const coinList = [];
      for(var i in coins.data) {
        coinList.push(coins.data[i]);
      }
      res.send(coinList.sort((a, b) => a.rank - b.rank));
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
