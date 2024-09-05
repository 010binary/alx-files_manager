import MongoClient from 'mongodb/lib/mongo_client';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    this.dbName = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient(`mongodb://${host}:${port}/${this.dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this._connected = false;

    this.client
      .connect()
      .then(() => {
        this._connected = true;
      })
      .catch((err) => console.log(err));
  }

  /**
   * Check if MongoDB client is alive
   * @returns {boolean} true if MongoDB is connected, otherwise false
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Get the number of documents in the users collection
   * @returns {Promise<number>} The number of documents in the users collection
   */
  async nbUsers() {
    return this.client.db(this.dbName).collection('users').countDocuments();
  }

  /**
   * Get the number of documents in the files collection
   * @returns {Promise<number>} The number of documents in the files collection
   */
  async nbFiles() {
    return this.client.db(this.dbName).collection('files').countDocuments();
  }

  /**
   * returns a cluster name
   * @returns {string} collection name
   */
  collection(name) {
    return this.client.db(this.dbName).collection(name);
  }
}

const dbClient = new DBClient();
export default dbClient;
