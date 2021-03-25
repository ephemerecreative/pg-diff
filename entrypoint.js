const { execSync } = require('child_process');
const makeClient = require("./client");
const dbname = require('./pg-diff-config.json').development.targetClient.database;
const pg_config_dev = require("./pg-diff-config.json").development.sourceClient;
RunCommands()
    .then(() => {
        console.log("Process Completed")
    }).catch((e) => {
        console.log("Error: ", e)
        process.exitCode = -1;
        process.exit();
})

async function RunCommands() {
    const client = await makeClient(pg_config_dev);
    const arguments = process.argv.slice(2);
    if (arguments.length <= 0) {
        console.log("No argument provided!");
        process.exit();
    }
    if(arguments[0] === 'create-migrations') {
        console.log(dbname);
       await createDatabase(client).then(() => {
            console.log("Creating Database");
       }).catch((e) => console.log("Error from postgres", e));

       try {
           await execSync('yarn pg-diff-file -mt development', {stdio: 'inherit'});
       }
       catch (err) {
           console.log("Error in new command", err.message);
           await dropDatabase(client);
           process.exit();
       }

        try {
            await execSync('yarn pg-diff-file -c development migrations', {stdio: 'inherit'});
        }
        catch (err) {
            console.log("Error in migration create command", err.message);
            await dropDatabase(client);
            process.exit();
        }

        dropDatabase(client).then(() => {
            console.log("Dropping database")
            client.end();
            process.exitCode = 0;
            process.exit();
        });
    }
    if( arguments[0] === 'run-migrations') {
        try {
            await execSync('yarn pg-diff-file -mt local', {stdio: 'inherit'});
            process.exit();
        }
        catch (err) {
            console.log("Error in new command", err.message);
        }
    }
}

async function createDatabase(client) {
    await client.query(`CREATE DATABASE ${dbname}`);
}

async function dropDatabase(client) {
    await client.query(`DROP DATABASE ${dbname}`);
}

