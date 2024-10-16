import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const api = setupCache(axios, {
    ttl: 15 * 60 * 1000 // Cache for 15 minutes
});

export default api;