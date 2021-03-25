const { exec } = require('child_process');
const makeClient = require("./pgClients");
const dbname = require('./pg-diff-config.json').development.targetClient.database;

RunCommands()
    .then(() => {
        console.log("Process Completed")
    }).catch((e) => {
        console.log("Error: ", e)
        process.exitCode = -1;
        process.exit();
})

async function RunCommands() {
    const arguments = process.argv.slice(2);
    const client = await makeClient();
    if (arguments.length <= 0) {
        console.log("No argument provided!");
        process.exit();
    }
    if(arguments[0] === 'create-migrations') {
        console.log(dbname);
       createDatabase(client).then(() => {
            console.log("function called");
       }).catch((e) => console.log("error from postgres", e));

        exec('yarn pg-diff-file -mt development', (err, stdout, stderr) => {
            console.log("in exec of applying")
            if (err) {
                console.log("errored", err)
                console.log(`any error: ${stderr}`);
                dropDatabase(client);
                process.exit();
                return;
            }
            console.log(`output on successful: ${stdout}`);
            console.log(`any error: ${stderr}`);
        });

       exec('yarn pg-diff-file -c development initial_diff', (err, stdout, stderr) => {
           console.log("in exec of create")
            if (err) {
                console.log("errorred", err);
                dropDatabase(client);
                process.exit();
                return;
            }
           dropDatabase(client).then(() => {
               console.log("dropped called")
               process.exitCode = 0;
               process.exit();
           });
            console.log(`output on successful: ${stdout}`);
            console.log(`any error creation: ${stderr}`);
            process.exit();
        });
    }
    if( arguments[0] === 'run-migrations') {
        exec('yarn pg-diff-file -mt local', (err, stdout, stderr) => {
            console.log("in exec of local migrations")
            if (err) {
                console.log("errorred", err);
                process.exit();
                return;
            }
            console.log(`output on successful: ${stdout}`);
            console.log(`any error creation: ${stderr}`);
            process.exit();
        });
    }
}

async function createDatabase(client) {
    await client.query(`CREATE DATABASE ${dbname}`).then(() => {
        console.log("created database")
    }).catch((e) => {
        console.log("errorMessage",e)
    });
}

async function dropDatabase(client) {
    await client.query(`DROP DATABASE ${dbname}`).then(() => console.log("dropped"))
}

