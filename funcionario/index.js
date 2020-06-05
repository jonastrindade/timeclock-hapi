const Joi = require('@hapi/joi');

exports.register = (server, options) => {

  server.route({
    method: 'POST',
    path: '/shift',
    config: {
      validate: {
        payload: Joi.object({
          inicio: Joi.date().iso().max('now').required(),
          fim: Joi.date().iso().min(Joi.ref('inicio')).max('now').required()
        }).allow(null)
      }
    },
    handler: (request, h) => {
      return request.payload;
    }
  });
  
};

exports.pkg = {
  name: "funcionario"
};