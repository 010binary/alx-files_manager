import redisClient from '../utils/redis';
import dbClient from '../utils/db';

/**
  * Check if redis and  MongoDB client is alive
  * @returns {boolean} redis and mongo connection status
  */
function getStatus(req, res) {
  res.send({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
}

/**
  * queries for users and file
  * @returns {Promise<number>} user and files
  */
async function getStats(req, res) {
  res.send({
    users: await dbClient.nbUsers(),
    files: await dbClient.nbFiles(),
  });
}

const AppController = {
  getStatus,
  getStats,
};

export default AppController;
