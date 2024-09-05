import { registerSchemaOnChain, client } from '../../services/schemaService';

// Mock the client's createSchema function
jest.mock('../../services/schemaService', () => ({
  ...jest.requireActual('../../services/schemaService'),
  client: {
    createSchema: jest.fn(), // Mock the createSchema function of the client
  },
}));

describe('Schema Registration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a schema on-chain and return a schema ID', async () => {
    // Arrange: Setup the mock response for client.createSchema
    (client.createSchema as jest.Mock).mockResolvedValue({ schemaId: 'mockSchemaId' });

    // Act: Call the function
    const schemaId = await registerSchemaOnChain();

    // Assert: Verify that the schemaId is correct
    expect(schemaId).toBe('mockSchemaId');
    expect(client.createSchema).toHaveBeenCalledTimes(1); // Verify that createSchema was called once
  });

  it('should throw an error if schema registration fails', async () => {
    // Arrange: Mock the client.createSchema to throw an error
    (client.createSchema as jest.Mock).mockRejectedValue(new Error('Registration failed'));

    // Act & Assert: Expect the function to throw the specific error
    await expect(registerSchemaOnChain()).rejects.toThrow('Schema registration failed');
    expect(client.createSchema).toHaveBeenCalledTimes(1); // Ensure createSchema was called once
  });
});
