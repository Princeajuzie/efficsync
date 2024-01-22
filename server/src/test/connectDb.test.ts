// ConnectDB.test.ts
import mongoose from "mongoose";
import ConnectDB from "../../db/dbConnect";

/// Mock mongoose
jest.mock('mongoose');

// Write the test
describe('ConnectDB function', () => {
  it('should connect to MongoDB successfully ❤️‍🔥...', async () => {
    // Mock mongoose.connect to resolve successfully
    (mongoose.connect as jest.Mock).mockResolvedValueOnce(null);

    // Mock server object
    const mockServer = {
      listen: jest.fn()
    };

    //  use the MongoDB connection env 
    const mongoConnectionString = process.env.MONGO_URL;

    // Call the ConnectDB function
    await ConnectDB(mockServer);

    // Expect that mongoose.connect was called with the correct arguments
    expect(mongoose.connect).toHaveBeenCalledWith(mongoConnectionString);
  });
});