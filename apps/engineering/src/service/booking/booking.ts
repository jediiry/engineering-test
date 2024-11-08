import axios from 'axios';

export type Booking = {
    id: string;
    user: string;
    parc: string;
    bookingdate: string;
    comments: string;
}

export type CreateBookingDto = {
    name: string;
    email: string;
}

export interface IBookingClientService {
    getBookings(): Promise<Booking[]>;
    getBooking(id: string): Promise<Booking | null>;
    deleteBooking(id: string): Promise<void>;
    createBooking(createBookingDto: CreateBookingDto): Promise<Booking>;
}

export class BookingClientService implements IBookingClientService {

    constructor(private baseUrl: string) { }

    getBookings = async (): Promise<Booking[]> => {
        try {
            const response = await axios.get(`${this.baseUrl}/bookings`);
            if (response.status !== 200) throw new Error('Error fetching bookings')
            return await response.data;
        } catch (error) {
            throw error;
        }
    }

    getBooking = async (id: string): Promise<Booking | null> => {
        try {
            const response = await axios.get(`${this.baseUrl}/bookings/${id}`);
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error('Failed to fetch booking');
        }
    }

    deleteBooking = async (id: string): Promise<void> => {
        try {
            const response = await axios.delete(`${this.baseUrl}/bookings/${id}`);
            if (response.status !== 200) {
                throw new Error('Failed to delete booking');
            }
        } catch (error) {
            throw new Error('Failed to delete booking');
        }
    }

    createBooking = async (createBookingDto: CreateBookingDto): Promise<Booking> => {
        try {
            const response = await axios.post(`${this.baseUrl}/bookings`, createBookingDto, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status !== 200) throw new Error('Unable to create booking')
            return response.data as Booking;
        } catch (error) {
            throw error;
        }
    }
}



