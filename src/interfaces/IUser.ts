export interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    image?: string;
    role: number;
    active: boolean;
}