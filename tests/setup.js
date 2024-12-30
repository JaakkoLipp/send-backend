const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const path = require("path");
const fs = require("fs");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  // Delete files in uploads folder
  const uploadsDir = path.join(__dirname, "../uploads");
  fs.readdir(uploadsDir, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(uploadsDir, file), (err) => {
        if (err) throw err;
      });
    }
  });
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});
