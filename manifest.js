module.exports = {
  server: {
    port: 8000
  },
  register: {
    plugins: [
      {
        plugin: require('./funcionario'),
      }
    ]
  }
};