const fetch = require("node-fetch");
require("dotenv").config();
const KEY = process.env.API_KEY;
const URL = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCd4UmlBFIhj-yJrzn6foxgw&key=${KEY}`;

let currentData = {};

setTimeout(() => {
  fetchData()
    .then(data => {
      currentData.data = data;
    })
    .catch(e => {
      console.log(e);
    });
}, 30000);

async function fetchData() {
  const response = await fetch(URL, {
    headers: { Accept: "application/json" }
  }).catch(e => {
    console.log(e);
  });

  const data = await response.json().catch(e => console.log(e));
  let subscribers = data.items[0].statistics.subscriberCount;
  let views = data.items[0].statistics.viewCount;
  return { subscribers, views };
}

module.exports = { currentData, fetchData };
