const pg = require("pg");

 async function makeClient() {
        let client = new pg.Client({
            host: "localhost",
            port: 5430,
            database: "postgres",
            user: "postgres",
            password: "password",
            applicationName: "pg-diff-cli"
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