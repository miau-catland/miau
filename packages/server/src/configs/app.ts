import Debug from "debug";
import * as bodyParser from "body-parser";
import express from 'express';
import { injectable, unmanaged } from 'inversify';

const debug = Debug('miau:app');

export interface AppConfiguration {
  port: number;
  maxBodySize: string;
  extendedUrlEncoding: boolean;
  basePath: string;
  disable: string[];
}

@injectable()
export class App {
  public server: express.Express;
  public configuration: AppConfiguration;
  public mainRouter: express.Router;

  public constructor(@unmanaged() { port, maxBodySize, extendedUrlEncoding, basePath, disable }: AppConfiguration, mainRouter: express.Router) {
    this.configuration = { port, maxBodySize, extendedUrlEncoding, basePath, disable };
    this.mainRouter = mainRouter;
    this.server = express();

    debug(`express app is created with config %O`, this.configuration);

    this.config();
    this.middlewares();
    this.routes();

    this.server.listen(this.configuration.port);
  }

  private config(): void {
    this.server.set('port', this.configuration.port);
    this.configuration.disable.forEach((setting): void => { this.server.disable(setting); });
  }

  private middlewares(): void {
    this.server.use(bodyParser.json());
    this.server.use(express.json({ limit: this.configuration.maxBodySize }));
    this.server.use(express.urlencoded({ extended: this.configuration.extendedUrlEncoding }));
  }

  private routes(): void {
    this.server.use(this.configuration.basePath, this.mainRouter);
  }
}

// const app = new App({ 
//   port: APP_PORT, 
//   maxBodySize: APP_MAX_BODY_SIZE, 
//   extendedUrlEncoding: true, 
//   basePath: APP_BASE_PATH, 
//   disable: ['etag'] 
// }, modulesRouter);
