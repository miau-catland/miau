import type { Container } from 'inversify';
import { TYPES } from '../constants/types';
import { buildRouter } from '../modules';
import { App } from './app';
import { Persistence } from './persistence';
import { APP_BASE_PATH, APP_MAX_BODY_SIZE, APP_PORT, PERSISTENCE_URI } from './settings';

export async function bootstrap(container: Container): Promise<[App, Persistence]> {
  if(container.isBound(TYPES.Persistence) === false) {
    const persistence = new Persistence({
      name: 'main',
      uri: PERSISTENCE_URI
    });
    await persistence.connect();
    
    container.bind<Persistence>(TYPES.Persistence).toConstantValue(persistence);
  }

  if(container.isBound(TYPES.App) === false) {
    const app = new App({ 
      port: APP_PORT, 
      maxBodySize: APP_MAX_BODY_SIZE, 
      extendedUrlEncoding: true, 
      basePath: APP_BASE_PATH, 
      disable: ['etag'] 
    }, buildRouter());
    container.bind<App>(TYPES.App).toConstantValue(app);
  }
  
  return [ container.get<App>(TYPES.App), container.get<Persistence>(TYPES.Persistence) ];
}
