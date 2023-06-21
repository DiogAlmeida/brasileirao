import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { allMatchesMock, matchesInProgress, matchesNotInProgress } from '../tests/mocks/MatchesMock'
import SequelizeMatches from '../database/models/SequelizeMatches';
chai.use(chaiHttp);

const { expect } = chai;

describe('Get /matches', () => {
  afterEach(sinon.restore)
  it('Testa se é retornado todas as partidas ', async () => {
    sinon.stub(SequelizeMatches, 'findAll' ).resolves(allMatchesMock as any)
    const response =  await chai.request(app).get('/matches').send()

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(allMatchesMock);
  });

  it('Testa se é retornado todas as partidas em progresso ', async () => {
    sinon.stub(SequelizeMatches, 'findAll' ).resolves(matchesInProgress as any)
    const response =  await chai.request(app).get('/matches').send()

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(matchesInProgress);
  });

  it('Testa se é retornado todas as partidas que não estão em progresso ', async () => {
    sinon.stub(SequelizeMatches, 'findAll' ).resolves(matchesNotInProgress as any)
    const response =  await chai.request(app).get('/matches').send()

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(matchesNotInProgress);
  });

});


