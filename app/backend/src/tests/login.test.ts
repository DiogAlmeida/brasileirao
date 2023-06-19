import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeUsers from '../database/models/SequelizeUsers';
import { validUser, validSequelizeUser, userWithInvalidEmail, userWithInvalidPassword, userWithoutEmail, userWithoutPassword, invalidUser } from './mocks/UsersMock';
chai.use(chaiHttp);

const { expect } = chai;

describe('Post /login', () => {
  afterEach(sinon.restore)
  it('Testa se é possivel efetuar o login com sucesso', async () => {
    const body = validUser;
    const loginUser = SequelizeUsers.build(validSequelizeUser)
    sinon.stub(SequelizeUsers, 'findOne').resolves(loginUser)
    sinon.stub(bcrypt, 'compareSync').resolves(true)

    const response =  await chai.request(app).post('/login').send(body)

    expect(response.status).to.equal(200);
    expect(response.body).to.haveOwnProperty('token');
  });

  it('Testa se é retornado um erro ao efetuar o login sem senha', async () => {
    const body = userWithoutPassword;

    const response =  await chai.request(app).post('/login').send(body)

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ "message": "All fields must be filled" });
  });

  it('Testa se é retornado um erro ao efetuar o login sem email', async () => {
    const body = userWithoutEmail;

    const response =  await chai.request(app).post('/login').send(body)

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ "message": "All fields must be filled" });
  });
  
  it('Testa se é retornado um erro ao efetuar o login com um email de formato inválido', async () => {
    const body = userWithInvalidEmail;

    const response =  await chai.request(app).post('/login').send(body)

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ "message": "Invalid email or password" });
  });

  it('Testa se é retornado um erro ao efetuar o login com uma senha de tamanho menor que 6', async () => {
    const body = userWithInvalidPassword;

    const response =  await chai.request(app).post('/login').send(body)

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ "message": "Invalid email or password" });
  });

  it('Testa se é retornado um erro ao efetuar o login com senha incorreta', async () => {
    const body = invalidUser;
    const loginUser = SequelizeUsers.build(validSequelizeUser)
    sinon.stub(SequelizeUsers, 'findOne').resolves(loginUser)
    

    const response =  await chai.request(app).post('/login').send(body)

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ "message": "Invalid email or password" });
  });
});
