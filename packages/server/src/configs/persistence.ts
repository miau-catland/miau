import Debug from "debug";
import { injectable, unmanaged } from 'inversify';
import { Connection, createConnection, Schema, Document, Model } from 'mongoose';

const debug = Debug('miau:persistence');

export interface PersistenceConfiguration {
  name: string;
  uri: string;
}

@injectable()
export class Persistence {
  public connection?: Connection;
  public configuration: PersistenceConfiguration;

  public constructor(@unmanaged() { name, uri }: PersistenceConfiguration) {
    this.configuration = { name, uri };
  }

  public async connect(): Promise<void> {
    debug(`creating connection for '%s' with config %O`, this.configuration.name, this.configuration);
    this.connection = await createConnection(this.configuration.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    debug(`connection  %O created with readyState %d`, this.connection, this.connection.readyState);
  }

  public model<TModel extends Document>(name: string, schema: Schema): Model<TModel> {
    if(!this.connection) {
      throw new Error('There is no connection created for model model retrieval.');
    }

    return this.connection.model<TModel>(name, schema);
  }
}

// const persistence = new Persistence({
//   name: 'main',
//   uri: Persistence_URI
// });
