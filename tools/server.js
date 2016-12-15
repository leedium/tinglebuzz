import cp from 'child_process';
const Server = () => {
  return new Promise((resolve, reject) => {
    ls = cp.exec('babel-node ./src/server/server.js', function (error, stdout, stderr) {
      if (error) {
        console.log(error.stack);
        console.log('Error code: '+error.code);
        console.log('Signal received: '+error.signal);
      }
      console.log('Child Process STDOUT: '+stdout);
      console.log('Child Process STDERR: '+stderr);
    });


    let serverStarted;
    serverStarted = cp.spawn(['nodemon',' --exec babel-node ./src/server/server.js']);
    serverStarted.stdout.once((err, data) => {
     console.log(err,data, '=========>');
     resolve();
    })
  });
};
export default Server;
