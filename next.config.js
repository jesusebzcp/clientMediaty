require("dotenv").config({ path: ".env" });

module.exports = {
  env: {
    URL: process.env.BASE_URL,
  },
};
