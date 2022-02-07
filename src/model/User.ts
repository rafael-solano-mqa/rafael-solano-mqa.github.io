export interface User {
    id: number;
    name: string;
    lastName: string;
    firstName: string;
    role: string;
    status: string;
    password?: string;
}