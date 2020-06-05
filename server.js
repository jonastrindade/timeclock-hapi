'use strict';

const Glue = require('@hapi/glue');
const manifest = require('./manifest');

const options = {
    relativeTo: __dirname
};

const startServer = async function () {
    try {
        const server = await Glue.compose(manifest, options);
        await server.start();
        console.log(`hapi server started on port ${manifest.server}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();