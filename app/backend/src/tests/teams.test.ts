import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeams from '../database/models/SequelizeTeams';
import { teams } from './mocks/TeamsMock';
chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
 afterEach(() => sinon.restore)

  it('Teste se retornar todos os times corretamente e com status 200', async () => {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any)

    const { status, body } = await chai.request(app).get('/teams')

    expect(status).to.equal(200);
    expect(body).to.equal(teams);
  });
});
