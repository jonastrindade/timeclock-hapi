const Joi = require('@hapi/joi');

exports.register = (server, options) => {

  server.route({
    method: 'POST',
    path: '/shift',
    config: {
      auth: 'simple',
      validate: {
        payload: Joi.object({
          inicio: Joi.date().iso().max('now').required(),
          fim: Joi.date().iso().min(Joi.ref('inicio')).max('now').required()
        }).allow(null)
      }
    },
    handler: (request, h) => {
      return {
        payload: request.payload,
        credentials: request.auth.credentials
      }
    }
  });
  
};

exports.pkg = {
  name: "funcionario"
};