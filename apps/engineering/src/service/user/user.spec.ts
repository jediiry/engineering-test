import axios from 'axios';
import { UserClientService, IUserClientService } from './user';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const baseUrl: string = 'http://localhost:3001/api/1';

describe('UserClientService', () => {

    let userClientService: IUserClientService;

    beforeEach(() => {
        userClientService = new UserClientService(baseUrl);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch all users', async () => {
        const mockUsers = [
            { id: '1', name: 'Alpha Shikaan', email: 'alpha@test.com' },
            { id: '2', name: 'Henry Obadoni', email: 'henry@test.com' }
        ];

        mockedAxios.get.mockResolvedValueOnce({ data: mockUsers, status: 200 });
        const users = await userClientService.getUsers();
        expect(users).toEqual(mockUsers);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${baseUrl}/users`);
    });

    it('should fetch a single user by ID', async () => {
        const mockUser = { id: '1', name: 'Henry Obadoni', email: 'henry@test.com' };
        mockedAxios.get.mockResolvedValueOnce({ data: mockUser, status: 200 });
        const user = await userClientService.getUser('1');
        expect(user).toEqual(mockUser);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${baseUrl}/users/1`);
    });

    it('should return null if user is not found', async () => {
        mockedAxios.get.mockResolvedValueOnce({ status: 404 });
        const user = await userClientService.getUser('999');
        expect(user).toBeNull();
        expect(mockedAxios.get).toHaveBeenCalledWith(`${baseUrl}/users/999`);
    });

    it('should handle errors when fetching users', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));
        await expect(userClientService.getUsers()).rejects.toBeDefined();
    });

    it('should create a user', async () => {
        const newUser = { name: 'Henry Jame', email: 'henry@test.com' };
        const createdUser = { id: '1', ...newUser };
        mockedAxios.post.mockResolvedValueOnce({ status: 200, data: createdUser });
        const user = await userClientService.createUser(newUser);

        expect(user).toEqual(createdUser);
        expect(mockedAxios.post).toHaveBeenCalledWith(`${baseUrl}/users`, newUser, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    });

    it('should handle errors when creating a user', async () => {
        const newUser = { name: 'John Doe', email: 'john@example.com' };
        mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

        await expect(userClientService.createUser(newUser)).rejects.toBeDefined();
    });

    it('should delete a user', async () => {
        mockedAxios.delete.mockResolvedValueOnce({ status: 200 });
        await expect(userClientService.deleteUser('1')).resolves.toBeUndefined();
        expect(mockedAxios.delete).toHaveBeenCalledWith(`${baseUrl}/users/1`);
    });

    it('should handle errors when deleting a user', async () => {
        mockedAxios.delete.mockRejectedValueOnce(new Error('Network Error'));
        await expect(userClientService.deleteUser('1')).rejects.toBeDefined();
    });
});
