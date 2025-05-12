const request = require('supertest');
const app = require('./src/app'); // Assuming your Express app is in app.js
const fs = require('fs');
const path = require('path');

let fileResp = {};

describe('Upload files', () => {
  it('should upload a file successfully', async () => {
    const filePath = path.join(__dirname, 'test-file.docx');
    fs.writeFileSync(filePath, 'Test file content');

    const response = await request(app)
      .post('/api/upload')
      .attach('file', filePath);
    
    expect(response.status).toBe(200);
    expect(response.body.filename).toBe('test-file.docx');
    fileResp = response.body;

    fs.unlinkSync(filePath);
  });

  it('should handle no file upload', async () => {
    const response = await request(app)
      .get('/api/files');

    expect(response.status).toBe(200);
  });

  it('should change the status to accepted', async () => {
    const currentFiles = await request(app)
      .get('/api/files');
    const id = currentFiles.body.files[0].id;

    const updateData = {
      status: 'accepted',
    };
    const response = await request(app)
      .put(`/api/files/${id}/status`)
      .send(updateData)
      .expect('Content-Type', /json/);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('accepted');
  });

  it('should change the status to rejected', async () => {
    const currentFiles = await request(app)
      .get('/api/files');
    const id = currentFiles.body.files[0].id;

    const updateData = {
      status: 'rejected',
    };
    const response = await request(app)
      .put(`/api/files/${id}/status`)
      .send(updateData)
      .expect('Content-Type', /json/);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('rejected');
  });
});
