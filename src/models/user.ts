

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    countryId: number;
    avatar: string;
    role: UserRole | number;
}

export interface UserDTO {
    name: string;
    username: string;
    email: string;
    password: string;
    role: UserRole | number;
    countryId: number;
    avatar: string;
}

export type UserRole = 'ADMIN' | 'ORGANIZER' | 'JUDGE' | 'PLAYER';