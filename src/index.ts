import { createServer } from 'http';

import CatFact from './CatFact';

import LongCatFact from './LongCatFact';

const longCatFact = LongCatFact.build();


const server = createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/long_cat_fact') {
	let lcf: LongCatFact = await longCatFact;
    const fact: CatFact = await lcf.savedCatFact;
    return res.end(JSON.stringify(fact));
  }

  res.statusCode = 404;
  return res.end();
});


server.listen(5000);

export default server;
