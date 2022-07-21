import { createServer } from 'http';

import CatFact from './CatFact';

import getLongCatFact from './getLongCatFact';

const server = createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/long_cat_fact') {
    const fact: CatFact = await getLongCatFact();
    return res.end(JSON.stringify(fact));
  }

  res.statusCode = 404;
  return res.end();
});

server.listen(5000);

export default server;
