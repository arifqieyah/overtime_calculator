let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./index');

chai.use(chaiHttp);
chai.should();

const salaryTest = 10000000;

describe('Overtime Calculation Test', () => {
  describe('/POST calculate-overtime', () => {
      it('test calculate overtime in weekday with hour < 1', (done) => {
        chai.request(server)
            .post('/calculate-overtime')
            .send({
              "salary":salaryTest,
              "overtimes": [{
                "date":"2022-10-10",
                "start":"18:25",
                "end":"19:10"
              }]
            })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('total').eql(0);
              done();
            });
      });
      it('test calculate overtime in weekday with hour = 1', (done) => {
        chai.request(server)
            .post('/calculate-overtime')
            .send({
              "salary":salaryTest,
              "overtimes": [{
                "date":"2022-10-10",
                "start":"18:30",
                "end":"19:30"
              }]
            })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('total').eql(86705.20);
              done();
            });
      });
      it('test calculate overtime in weekday with hour > 1', (done) => {
        chai.request(server)
            .post('/calculate-overtime')
            .send({
              "salary":salaryTest,
              "overtimes": [{
                "date":"2022-10-10",
                "start":"18:00",
                "end":"23:00"
              }]
            })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('total').eql(549132.95);
              done();
            });
      });
      it('test calculate overtime in dayoff (weekend) with hour < 8', (done) => {
        chai.request(server)
            .post('/calculate-overtime')
            .send({
              "salary":salaryTest,
              "overtimes": [{
                "date":"2022-12-10",
                "start":"08:00",
                "end":"11:00"
              }]
            })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('total').eql(346820.81);
              done();
            });
      });
      it('test calculate overtime in dayoff (weekend) with hour = 8', (done) => {
        chai.request(server)
            .post('/calculate-overtime')
            .send({
              "salary":salaryTest,
              "overtimes": [{
                "date":"2022-12-10",
                "start":"08:00",
                "end":"16:00"
              }]
            })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('total').eql(924855.49);
              done();
            });
      });
      it('test calculate overtime in dayoff (weekend) with hour = 9', (done) => {
        chai.request(server)
            .post('/calculate-overtime')
            .send({
              "salary":salaryTest,
              "overtimes": [{
                "date":"2022-12-10",
                "start":"08:00",
                "end":"17:00"
              }]
            })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('total').eql(1098265.90);
              done();
            });
      });
      it('test calculate overtime in dayoff (weekend) with hour > 9', (done) => {
        chai.request(server)
            .post('/calculate-overtime')
            .send({
              "salary":salaryTest,
              "overtimes": [{
                "date":"2022-12-10",
                "start":"08:00",
                "end":"20:00"
              }]
            })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('total').eql(1791907.51);
              done();
            });
      });
      it('test calculate overtime in dayoff (holiday) with hour < 8', (done) => {
        chai.request(server)
            .post('/calculate-overtime')
            .send({
              "salary":salaryTest,
              "overtimes": [{
                "date":"2022-08-17",
                "start":"08:00",
                "end":"11:00"
              }]
            })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('total').eql(346820.81);
              done();
            });
      });
      it('test calculate overtime in dayoff (holiday) with hour = 8', (done) => {
        chai.request(server)
            .post('/calculate-overtime')
            .send({
              "salary":salaryTest,
              "overtimes": [{
                "date":"2022-08-17",
                "start":"08:00",
                "end":"16:00"
              }]
            })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('total').eql(924855.49);
              done();
            });
      });
      it('test calculate overtime in dayoff (holiday) with hour = 9', (done) => {
        chai.request(server)
            .post('/calculate-overtime')
            .send({
              "salary":salaryTest,
              "overtimes": [{
                "date":"2022-08-17",
                "start":"08:00",
                "end":"17:00"
              }]
            })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('total').eql(1098265.90);
              done();
            });
      });
      it('test calculate overtime in dayoff (holiday) with hour > 9', (done) => {
        chai.request(server)
            .post('/calculate-overtime')
            .send({
              "salary":salaryTest,
              "overtimes": [{
                "date":"2022-08-17",
                "start":"08:00",
                "end":"20:00"
              }]
            })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('total').eql(1791907.51);
              done();
            });
      });
  });
});