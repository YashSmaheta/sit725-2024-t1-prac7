// import { expect } from 'chai';
const assert = require('assert');
// ÷const chai = require('chai');
const request = require('supertest');
const app = require('./app.js');
const { connectdb } = require('./data.js');
// const { epect } = chai;

describe('Controller Tests', () => {
    before(async () => {
        await connectdb();
    });

    describe('POST /submit', () => {
        it('It insert form data and shows success msg', (done) => {
            const formData = { first_name: 'Yash', last_name: 'Maheta', mobile_no: '0123456789', email: 'yash123@deakin.com' };
            request(app)
                .post('/submit')
                .send(formData)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    assert.strictEqual(res.body.message, 'Form Data Saved!!!!!');
                    done();
                });
        });
    });
});
