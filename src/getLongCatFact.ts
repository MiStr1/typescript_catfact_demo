import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import CatFact from './CatFact';

const axios = require('axios').default;

const catFactCache = new CacheContainer(new MemoryStorage());

async function getCatFact(throwError = false): Promise<CatFact> {
  try {
    if (throwError) {
      throw new Error('Something went wrong');
    }

    const response = await axios.get('https://catfact.ninja/fact?fbclid=IwAR0OjHngBdGak6snknfo1UfLmZpbYc2Qmaumw_BPdbrcc7j2MCPia7GHaH8');
    return response.data as CatFact;
  } catch (exception) {
    process.stderr.write(`ERROR received ${exception}\n`);
    return { fact: '', length: 0 } as CatFact;
  }
}

async function getLongCatFact(): Promise<CatFact> {
  const cachedFact = await catFactCache.getItem<CatFact>('cat_fact');
  if (cachedFact) {
    return cachedFact;
  }

  let catFact = await getCatFact();

  do {
    catFact = await getCatFact();
  }
  while (catFact.length < 80);

  await catFactCache.setItem('cat_fact', catFact, { ttl: 3600 });

  return catFact;
}

export default getLongCatFact;
export { getCatFact };
