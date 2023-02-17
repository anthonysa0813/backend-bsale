const express = require("express");
const cors = require("cors");
const connectDB = require("../database/config");
const morgan = require("morgan");
class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3000;
    this.paths = {
      admin: "/api/admin",
      auth: "/api/auth",
      admin: "/api/admin",
      phase1: "/api/phase1",
      answer: "/api/answer",
    };
    this.middleware();
    this.router();
    this.connectDatabase();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  connectDatabase() {
    connectDB();
  }

  router() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.admin, require("../routes/admin"));
    this.app.use(this.paths.phase1, require("../routes/phases/phase1"));
    this.app.use(this.paths.answer, require("../routes/answer"));
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`the app is listening in the port ${this.PORT}`);
    });
  }
}

module.exports = Server;
