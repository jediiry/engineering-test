import axios from 'axios';

export type Parc = {
    id: string;
    name: string;
    description: string;
}

export type CreateParcDto = {
    name: string;
    description: string;
}

export interface IParcsClientService {
    getParcs(): Promise<Parc[]>;
    getParc(id: string): Promise<Parc | null>;
    deleteParc(id: string): Promise<void>;
    createParc(createParcDto: CreateParcDto): Promise<Parc>;
}

export class ParcsClientService implements IParcsClientService {

    constructor(private baseUrl: string) { }

    getParcs = async (): Promise<Parc[]> => {
        try {
            const response = await axios.get(`${this.baseUrl}/parcs`);
            if (response.status !== 200) throw new Error('Error fetching parcs')
            return await response.data;
        } catch (error) {
            throw error;
        }
    }

    getParc = async (id: string): Promise<Parc | null> => {
        try {
            const response = await axios.get(`${this.baseUrl}/parcs/${id}`);
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error('Failed to fetch Parc');
        }
    }

    deleteParc = async (id: string): Promise<void> => {
        try {
            const response = await axios.delete(`${this.baseUrl}/parcs/${id}`);
            if (response.status !== 200) {
                throw new Error('Failed to delete parc');
            }
        } catch (error) {
            throw error;
        }
    }

    createParc = async (createParcDto: CreateParcDto): Promise<Parc> => {
        try {
            const response = await axios.post(`${this.baseUrl}/parcs`, createParcDto, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status !== 200) throw new Error('Unable to create Parc')
            return response.data as Parc;
        } catch (error) {
            throw error;
        }
    }
}



