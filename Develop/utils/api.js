const axios = require('axios');
const api = {
    async getUser(userResponses) {
      let response = await axios
        .get(`https://api.github.com/users/${userResponses.username}`);
        return response.data;
      }
  };	
  module.exports = {
    apiCalls: api
  };
