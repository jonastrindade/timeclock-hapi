const Joi = require('@hapi/joi');
const service = require('../shift/service');

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
    handler: async (request, h) => {
      
      // return {
      //   payload: request.payload,
      //   credentials: request.auth.credentials
      // }
      const inicio = request.payload.inicio;
      const fim = request.payload.fim;
      
      await service.save({
        inicio: inicio,
        fim: fim,
        username: request.auth.credentials.username
      });

      let horas = ((fim.valueOf() - inicio.valueOf())/1000/60/60).toFixed(2);

      return h.response ({
        message: `Obrigado por enviar seu horário. O tempo total foi de ${horas} horas!`
      }).code(201);
    }
  });
  
};

exports.pkg = {
  name: "funcionario"
};