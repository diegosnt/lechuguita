const request = require('supertest');
const app = require('../index');

describe('API Endpoints', () => {
  describe('GET /api/health', () => {
    it('should return status ok', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('uptime');
    });
  });

  describe('GET /api/info', () => {
    it('should return project info', async () => {
      const res = await request(app).get('/api/info');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('nombre');
      expect(res.body).toHaveProperty('version');
    });
  });

  describe('GET /api/frase', () => {
    it('should return a Chuck Norris joke', async () => {
      const res = await request(app).get('/api/frase');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
    }, 10000); // timeout de 10s para la API externa
  });
});
