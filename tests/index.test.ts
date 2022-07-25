import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import { set } from 'mockdate';
import LongCatFact from '../src/getLongCatFact';

import CatFact from '../src/CatFact';

import server from '../src/index';

chai.use(chaiHttp);

jest.setTimeout(10000);

describe('testing the length of facts and if facts stay the same', () => {
  test('check if length <=80', async () => {
    set('2019-04-13T18:09:12.451Z');
    const fact: CatFact = await getLongCatFact();
    expect(fact.length >= 80).toBeTruthy();
  });

  test('check if fact does change after cache timeout', async () => {
    set('2020-04-13T18:09:12.451Z');
    const catFact: CatFact = await getLongCatFact();

    set('2020-04-13T19:10:13.451Z');
    const catFact2: CatFact = await getLongCatFact();

    expect(catFact.fact !== catFact2.fact).toBeTruthy();
  });

  test('check if fact does not change', async () => {
    set('2021-04-13T19:10:13.451Z');

    const firstCatFact: CatFact = await getLongCatFact();
    const firstFactText = firstCatFact.fact;

    for (let i = 0; i < 20; i += 1) {
      const catFact: CatFact = await getLongCatFact();
      expect(firstFactText === catFact.fact).toBeTruthy();
    }
  });

  test('check if fact does not change after 59 min', async () => {
    set('2022-04-13T18:10:12.451Z');
    const catFact: CatFact = await getLongCatFact();

    set('2022-04-13T19:09:55.451Z');
    const catFact2: CatFact = await getLongCatFact();

    expect(catFact.fact === catFact2.fact).toBeTruthy();
  });

  test('test error handling', async () => {
    const catfact: CatFact = await getCatFact(true);
    expect(catfact.fact === '').toBeTruthy();
    expect(catfact.length === 0).toBeTruthy();
  });
});

describe('Test API request', () => {
  it('should return response on call', () => chai.request(server).get('/long_cat_fact')
    .then((res) => {
      const response = JSON.parse(res.text) as CatFact;
      expect(response.length >= 80).toBeTruthy();
    }));

  it('should return 404 on wrong calls', () => chai.request(server).get('/long')
    .then((res) => {
      chai.expect(res).to.have.status(404);
    }));
});
