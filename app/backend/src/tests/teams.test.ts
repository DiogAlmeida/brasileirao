import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeams from '../database/models/SequelizeTeams';
import { teams } from './mocks/TeamsMock';
chai.use(chaiHttp);

const { expect } = chai;

describe('Get /teams', () => {
  afterEach(sinon.restore)
  it('Testa se a função findAll retornar todos os times corretamente', async () => {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any)

    const { status, body } = await chai.request(app).get('/teams')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('Testa se a função findOne retornar o time corretamente', async () => {
    sinon.stub(SequelizeTeams, 'findOne').resolves(teams[0] as any)

    const { status, body } = await chai.request(app).get('/teams/1')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams[0]);
  });

  it('Testa se a função findOne retornar erro caso o time não seja encontrado', async () => {
    sinon.stub(SequelizeTeams, 'findOne').resolves(null)

    const { status, body } = await chai.request(app).get('/teams/123')

    expect(status).to.equal(404);
    expect(body).to.deep.equal({
      "message": "Team 123 not found"
    });
  });
});
