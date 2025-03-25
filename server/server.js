const express = require("express");
const path = require("path");
const cors = require("cors");
const db = require("./config/connection");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);
app.use(cors({
  origin: "https://alemar-habit-tracker.netlify.app",
  credentials: true
}));

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
}

db.once("open", () => {
  app.listen(PORT, () => console.log( `Server is running on localhost:${PORT}` ));
});