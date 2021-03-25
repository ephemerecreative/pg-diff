const pg = require("pg");


async function makeClient(pg_config) {
    let client = new pg.Client({
        host: pg_config.host,
        port: pg_config.port,
        database: pg_config.database,
        user: pg_config.user,
        password: pg_config.password,
        applicationName: pg_config.applicationName
    });

    await client.connect(err => {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('Connected tp postgres database')
        }
    })
    return client;
}

module.exports = makeClient;