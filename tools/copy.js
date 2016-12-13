import copy from 'copy';

const copyfiles = () => {
  return new Promise((resolve, reject) => {
    console.log('copying files...'.yellow);
    copy('./src/public/*','./dist',(err, files) => {
        if(err){
          reject();
          return;
        }
        console.log('copy files completed.'.green);
        resolve();
    });
  })
}

export default copyfiles;