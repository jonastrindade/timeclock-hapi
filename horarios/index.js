const service = require('./service');
const Joi = require('@hapi/joi');

exports.register = (server) => {

  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: 'session'
    },
    handler: async (request, h) => {
      
      const data = await service.findAll();

      return h.view('horarios/list.html', {
        horas: data
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/',
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
  

  server.route({
    method: 'POST',
    path: '/{id}/aprovar',
    config: {
      auth: 'session'
    },
    handler: async (request, h) => {

      await service.update({
        id: request.params.id,
        validador: request.auth.credentials.username,
        situacao: 'aprovado'
      });

      return h.redirect('/horarios');
    }
  });

  server.route({
    method: 'POST',
    path: '/{id}/rejeitar',
    config: {
      auth: 'session'
    },
    handler: async (request, h) => {

      await service.update({
        id: request.params.id,
        validador: request.auth.credentials.username,
        situacao: 'rejeitado'
      });

      return h.redirect('/horarios');
    }
  });
  
};

exports.pkg = {
  name: "horarios"
};