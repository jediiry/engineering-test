import axios from 'axios';

export type User = {
    id: string;
    name: string;
    email: string;
}

export type CreateUserDto = {
    name: string;
    email: string;
}

export interface IUserClientService {
    getUsers(): Promise<User[]>
    getUser(id: string): Promise<User | null>
    deleteUser(id: string): Promise<void>
    createUser(createUserDto: CreateUserDto): Promise<User>
}

export class UserClientService implements IUserClientService {

    constructor(private baseUrl: string) { }

    getUsers = async (): Promise<User[]> => {
        try {
            const response = await axios.get(`${this.baseUrl}/users`);
            if (response.status !== 200) {
                throw new Error('Error fetching users')
            }
            return response.data;
        } catch (error) {
            console.error('Error', error);
            throw new Error('Failed to fetch users');
        }
    }

    getUser = async (id: string): Promise<User | null> => {
        try {
            const response = await axios.get(`${this.baseUrl}/users/${id}`);
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            console.error(`Failed to fetch user with ID ${id}:`, error);
            throw new Error(`Failed to fetch user with ID ${id}`);
        }
    }

    deleteUser = async (id: string): Promise<void> => {
        try {
            const response = await axios.delete(`${this.baseUrl}/users/${id}`);
            if (response.status !== 200) {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            throw new Error(`Failed to delete user with ID ${id}`);
        }
    }

    createUser = async (createUserDto: CreateUserDto): Promise<User> => {
        try {
            const response = await axios.post(`${this.baseUrl}/users`, createUserDto, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status !== 200) {
                throw new Error('Unable to create user')
            }
            return response.data as User;

        } catch (error) {
            throw new Error('Failed to create user');
        }
    }
}