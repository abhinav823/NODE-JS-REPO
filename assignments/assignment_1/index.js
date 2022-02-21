function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    return process.argv[process.argv.length -1]
}

function getNameFromEnv() {
    // Write your code here
    return process.env.name
}

function getNameFromReadLine() {
    // Write your code here
    var readline = require("readline");
    var rl = readline.createInterface(process.stdin,process.stdout);
    rl.question("Enter Name ", (name) => {
        console.log(name);
        rl.close();
    });
}


module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}