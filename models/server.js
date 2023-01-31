const express = require("express");
const cors = require("cors");
const connectDB = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3000;
    this.paths = {
      auth: "/api/auth",
    };
    this.middleware();
    this.connectDatabase();
    this.router();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  connectDatabase() {
    connectDB();
  }

  router() {
    this.app.use(this.paths.auth, require("../routes/auth"));
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`the app is listening in the port ${this.PORT}`);
    });
  }
}

module.exports = Server;
