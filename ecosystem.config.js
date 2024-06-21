// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: 'tokotitohweb',
        script: 'npm',
        args: 'start',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'production',
          PORT: 3001, // Adjust port if needed
        },
      },
    ],
  };
  