const Path = require('path');

module.exports = {
  server: {
    port: 8000,
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  },
  register: {
    plugins: [
      {
        plugin: require('@hapi/inert')
      },
      {
        plugin: '@hapi/vision',
        options: {
          engines: {
            html: require('handlebars')
          },
          path: __dirname,
          layout: true,
          layoutPath: 'templates/layouts',
        }
      },
      {
        plugin: require('./home')
      },
      {
        plugin: require('./gerente'),
        routes: {
          prefix: '/gerente'
        }  
      },
      {
        plugin: require('./funcionario'),
        routes: {
          prefix: '/funcionario'
        }  
      }
    ]
  }
};