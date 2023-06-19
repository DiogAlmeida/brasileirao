import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import createToken from '../utils/createToken'
import { invalidToken, validToken } from './mocks/TokenMock';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { validSequelizeUser } from './mocks/UsersMock';
chai.use(chaiHttp);

const { expect } = chai;

describe('Get /login/role', () => {
  afterEach(sinon.restore)
  it('Testa se é retornado um erro caso o token não exista', async () => {

    const response =  await chai.request(app).get('/login/role')

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ "message": "Token not found" });
  });

  it('Testa se é retornado um erro caso o token seja inválido', async () => {

    const response =  await chai.request(app).get('/login/role').set({authorization: invalidToken})

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ "message": "Token must be a valid token" });
  });
  it('Testa se é retornado a role do usuario com sucesso caso o token seja válido', async () => {
    const validUser = SequelizeUsers.build(validSequelizeUser)
    sinon.stub(SequelizeUsers, 'findOne').resolves(validUser)
    sinon.stub(createToken, 'verifyToken').resolves(true)
    const response =  await chai.request(app).get('/login/role').set({authorization: validToken})

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ "role": validSequelizeUser.role });
  });
});


