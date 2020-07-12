import "reflect-metadata";

import Debug from "debug";
import { container } from './configs/container';
import { bootstrap } from './configs/bootstrap';
import { APP_ENV } from './configs/settings';

const debug = Debug('miau:index');

void (async() => {
  debug(`welcome to miau running in %s mode. now bootstrapping`, APP_ENV);
  await bootstrap(container);
})();
