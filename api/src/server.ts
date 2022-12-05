import { Application } from './application';

class AppServer {
  constructor(private app: Application) {}

  init() {
    this.app.start();
  }
}

const server = new AppServer(new Application());
server.init();
