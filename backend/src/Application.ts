import WebServer from "./webEndpoints/WebServer";
import NodeDatabase from "./database/NodeDatabase";

export default class Application {

  private readonly web: WebServer;
  private readonly db: NodeDatabase;

  constructor() {
      this.db = new NodeDatabase({
          "type": "postgres",
          "host": "localhost",
          "port": 5432,
          "username": "postgres",
          "password": "postgres",
          "database": "memoryHack",
          "synchronize": true,
          "logging": false,
          "entities": [
              "dist/database/models/**/*.js"
          ]
      });
      this.web = new WebServer(8888, 'localhost', this.db);
  }

  async start (): Promise<void> {
      await this.web.start();
      await this.db.initConnection();
  }
}
