const express = require("express");
const helmet = require("helmet");
const PORT = process.env.PORT || 1101;
const { fetchData, currentData } = require("./yt-service");
const { join } = require("path");

const app = express();
app.use(helmet());
app.use(express.static(join(__dirname, "www")));

app.get("/api/v1", (req, res) => {
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
