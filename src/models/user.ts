

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    countryId: number;
    role: UserRole;
}

export type UserRole = 'ADMIN' | 'ORGANIZER' | 'JUDGE' | 'PLAYER';