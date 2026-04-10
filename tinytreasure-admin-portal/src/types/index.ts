// This file exports TypeScript types and interfaces used throughout the application.

export interface Product {
    id: string;
    name: string;
    status: 'available' | 'sold' | 'donated';
}

export interface DonationProduct {
    id: string;
    itemName: string;
    status: 'pending' | 'completed' | 'cancelled';
}

export interface User {
    id: string;
    username: string;
    email: string;
    token: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}