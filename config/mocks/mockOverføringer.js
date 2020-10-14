const path = require('path');

const identOverføringMap = {
  '01010101010': path.join(
    __dirname,
    'mockdata',
    'overføringer_01010101010.json',
  ),
};

const mockOverføringer = app => {
  app.get('/api/overforinger', (req, res) => {
    const { personident } = req.query;
    const overføringJsonPath = identOverføringMap[personident];

    if (overføringJsonPath) {
      return res.status(200).sendFile(overføringJsonPath);
    }

    return res.sendStatus(404);
  });
};

module.exports = mockOverføringer;
