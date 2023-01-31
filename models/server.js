const express = require("express");
// const connectDB = require("../db/connectDB");
// const fileUpload = require("express-fileupload");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.paths = {
      auth: "/api/auth"
    };
    this.middleware();
    this.router();
    // this.connectMondoDB();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());

  }

  router() {
    this.app.use(this.paths.auth, require("../routes/auth"));
  }

  listen() {
    this.app.listen(5050, () => {
      console.log(`the app is listening in the port ${5050}`);
    });
  }
}

module.exports = Server;
