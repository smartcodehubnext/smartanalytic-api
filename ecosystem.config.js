module.exports = {
  apps: [
    {
      name: "smart-analytics-api",
      script: "./dist/smartanalyticapi.js",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      },
      watch: true,
      error_file: "err.log",
      out_file: "out.log",
      log_file: "combined.log"
    }
  ]
};
