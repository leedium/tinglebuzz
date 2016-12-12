import devConfig from './webpack.dev.config';
import prodConfig from './webpack.prod.config';
import isDev from './env';

function config(){
  if(isDev){
    return devConfig
  }else{
    return prodConfig
  }
}

export default config;






