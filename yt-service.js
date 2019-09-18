const fetch = require("node-fetch")
require("dotenv").config()
const KEY = process.env.API_KEY
const URL = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCd4UmlBFIhj-yJrzn6foxgw&key=${KEY}`

let currentData = {}

setTimeout(() => {
  fetchData()
    .then(data => {
      currentData.data = data
    })
    .catch(e => {
      console.log(e)
    })
}, 60 * 60 * 1000)

async function fetchData() {
  const response = await fetch(URL, {
    headers: { Accept: "application/json" }
  }).catch(e => {
    console.log(e)
  })

  const data = await response.json()

  if (data) {
    let subscribers = data.items[0].statistics.subscriberCount
    let views = data.items[0].statistics.viewCount
    currentData.data = { subscribers, views }
    return { subscribers, views }
  }

  return { subscribers: 0, views: 0 }
}

module.exports = { currentData, fetchData }
