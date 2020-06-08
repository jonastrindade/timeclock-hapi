exports.register = (server, options) => {

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      
      return h.view('gerente/list.html', {
        horas: [
          {
            funcionario: 'fun1',
            horas: 40
          },
          {
            funcionario: 'fun2',
            horas: 37
          },
          {
            funcionario: 'fun3',
            horas: 45
          }
        ]
      });

    }
  });
  
};

exports.pkg = {
  name: "gerente"
};