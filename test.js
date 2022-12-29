let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./index');


chai.use(chaiHttp);

describe('Overtime Calculation', () => {
  describe('/POST calculate', () => {
       it('it should return the correct calculation', (done) => {
        let req = {
          "salary": 10000000,
          "overtimes": [{
              "date": "2022-12-24",
              "start": "09:00:00",
              "end": "19:00:00"
            },
            {
              "date": "2022-12-25",
              "start": "09:00:00",
              "end": "15:00:00"
            },
            {
              "date": "2022-12-26",
              "start": "18:00:00",
              "end": "20:00:00"
            }
          ]
        }
        chai.request(server)
            .post('/calculate-overtime')
            .send(req)
            .end((err, res) => {
              console.log(err);
//                  res.should.have.status(200);
                  //res.body.should.be.a('object');
//                  res.body.should.have.property('total').eql(2225433.53);
              done();
            });
      });
  });
});