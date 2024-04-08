export interface ICheckOut {
    id?: number | string;
    user: number;
    name: string;
    companyName?: string;
    country: string;
    streetAddress: string;
    townCity: string;
    province: string;
    zipCode: string;
    phone: string;
    email: string;
    additionalInformation?: string;
    listProduct: object[];
    total: number;
    status: number;
}