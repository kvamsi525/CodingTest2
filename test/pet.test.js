const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - pet', () => {
    it('should fail to create a pet without a Name', async () => {
        const res = await request(app).post('/pets').send({
            age: '16',
            color: 'green',
        });
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('"name" is required');
    });

    it('should create a pet', async () => {
        const pet = {
            name: 'Dog',
            age: 5,
            color: 'white',
        };
        const res = await request(app).post('/pets').send(pet);
        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal(pet.name);
        expect(res.body.age).to.equal(pet.age);
        expect(res.body.color).to.equal(pet.color);
    });

    it('should fail to get a pet without objectid', async () => {
        const res = await request(app).get('/pets/123');
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('"id" with value "123" fails to match the valid mongo id pattern');
    })

    it('should get a pet with objectid', async () => {
        const res = await request(app).get('/pets/5f745b8eb9ccbb315c00ec9c');
        expect(res.status).to.equal(200);
    })

    it('should fail to delete a pet without objectid', async () => {
        const res = await request(app).delete('/pets/123');
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('"id" with value "123" fails to match the valid mongo id pattern');
    })

    it('should delete a pet with objectid', async () => {
        const res = await request(app).delete('/pets/5f745b8eb9ccbb315c00ec9c');
        expect(res.status).to.equal(200);
    })

});