import colors from 'colors';
import del from 'del';
import path from 'path';

const clean = () => {
  const delPaths = [
    path.resolve(__dirname,'../build/**/*'),
    path.resolve(__dirname,'../dist/**/*')
  ];
  console.log('cleaning...'.yellow);
  return new Promise((resolve, reject) => {
    del(delPaths).then((paths) => {
      console.log('clean completed.'.green);
      resolve();
    }, reject);
  });
};

export default clean;
