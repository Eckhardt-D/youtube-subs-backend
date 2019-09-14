const express = require("express");
const helmet = require("helmet");
const PORT = process.env.PORT || 1101;
const { fetchData, currentData } = require("./yt-service");

const app = express();
app.use(helmet());

app.get("/", (req, res) => {
  if (!currentData.data) {
    fetchData()
      .then(updated => {
        res.json(updated);
      })
      .catch(e => {
        res.json({ data: {} });
      });
  } else {
    res.json(currentData);
  }
});

app.listen(PORT, () => {
  console.log("Server is listening...");
});
