import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });
  }

  /**
   * Check if Redis client is alive
   * @returns {boolean} true if Redis is connected, otherwise false
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Get the value of a key from Redis
   * @param {string} key - The key to retrieve
   * @returns {Promise<string | null>} - The value of the key, or null if not found
   */
   get(key) {
    const get = promisify(this.client.get).bind(this.client)
    return get(key);
  }

  /**
   * Set a key-value pair in Redis with an expiration time
   * @param {string} key - The key to set
   * @param {string} value - The value to set
   * @param {number} duration - The expiration time in seconds
   * @returns {Promise<void>}
   */
   set(key, value, duration) {
    const set = promisify(this.client.setex).bind(this.client);
    return set(key, duration, value);
  }

  /**
   * Delete a key from Redis
   * @param {string} key - The key to delete
   * @returns {Promise<void>}
   */
   del(key) {
    const del = promisify(this.client.del).bind(this.client);
    return del(key);
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;

