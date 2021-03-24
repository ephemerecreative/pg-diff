const pg = require("pg");

 async function makeClient() {
        let client = new pg.Client({
            host: "host.docker.internal",
            port: 5430,
            database: "postgres",
            user: "postgres",
            password: "password",
            applicationName: "pg-diff"
        });

        await client.connect(err => {
            if (err) {
                console.error('connection error', err.stack)
            } else {
                console.log('connected')
            }
        })
        return client;
}
module.exports = makeClient;