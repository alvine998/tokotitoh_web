// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: 'tokotitohweb',
        script: 'npm',
        args: 'run dev',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'development',
          PORT: 3001, // Adjust port if needed
        },
      },
    ],
  };
  