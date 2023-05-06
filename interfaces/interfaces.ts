export interface ColorDetails {
    id: number;
    name: string;
    colors_url: string[];
    primary_url: string;
    secondary_url: string | null;
    hex_value: string;
    hex_value_2: string | null;
}

export interface ColorCards {
    color: ColorDetails;
}

export interface ProductDetails {
    id: string;
    name: string;
    description: string;
    image_url: string;
    price: number;
    color: ColorDetails[];
}

export interface Filters {
    id: string;
    name: string;
    options: FiltersOptions[];
}

export interface FiltersOptions {
    value: string;
    label: string;
    checked: boolean;
}

export interface LoginData {
    email: string;
    password: string
}