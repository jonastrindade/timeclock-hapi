const service = require('./service');

exports.register = async function (server) {

    await server.register(require('@hapi/bell'));
    await server.register(require('@hapi/basic'));
    await server.register(require('@hapi/cookie'));

    server.auth.strategy('simple', 'basic', { 
        validate: service.validate
    })

    server.auth.strategy('google', 'bell', {
        provider: 'google',
        password: 'cookie_encryption_password_secure',
        clientId: '403646896540-ts44l4f2umqvffubcjliel58rh2vmole.apps.googleusercontent.com',
        clientSecret: '8OK6VntLINGickFogtk_8mc1',
        isSecure: false
    });

    server.auth.strategy('session', 'cookie', {

        cookie: {
            name: 'session',
            path: '/',
            password: 'password-should-be-32-characters',
            isSecure: false
        },
        appendNext: true,
        redirectTo: '/'
    });

    server.route({
        method: 'GET',
        path: '/google/login',
        options: {
            auth: {
                strategy: 'google',
                mode: 'try'
            },
            handler: function (request, h) {

                if (!request.auth.isAuthenticated) {
                    return `Authentication failed due to: ${request.auth.error.message}`;
                }

                request.cookieAuth.set({
                    username: request.auth.credentials.profile.email
                  });
                
                const next = request.auth.credentials.query.next ? request.auth.credentials.query.next : '/home';

                return h.redirect(next);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/logout',
        options: {
            handler: (request, h) => {

                request.cookieAuth.clear();
                return h.redirect('/');
            }
        }
    });


};

exports.pkg = {
    name: 'auth'
};