const request = require('supertest');
const app = require('../../main/index');

describe('API /api/minimize', () => {
  test('returns minimized suite', async () => {
    const payload = {
      requirements: ['R1', 'R2'],
      tests: [
        { id: 'T1', covers: ['R1'] },
        { id: 'T2', covers: ['R1', 'R2'] }
      ]
    };

    const res = await request(app)
      .post('/api/minimize')
      .send(payload)
      .expect(200);

    expect(res.body.coverageSatisfied).toBe(true);
    expect(res.body.selectedTests).toEqual(['T2']);
  });

  test('validates payload', async () => {
    const res = await request(app)
      .post('/api/minimize')
      .send({ wrong: true })
      .expect(400);

    expect(res.body.error).toBeDefined();
  });
});

