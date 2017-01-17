import request from 'superagent';

const ClientRequest = {
  getBrainTreeClientToken() {
    return new Promise((resolve, reject) => {
      request.get('/payment-client-token')
        .end((err, res) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res.body);
        });
    });
  },
}

class ServerRequest {

}

export {ClientRequest, ServerRequest};
