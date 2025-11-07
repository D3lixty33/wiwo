export type Product = {
    id : string;
    created_at : string;
    product? : string;
    description? : string
    user_id? : string
}

export type User = {
    id : string,
    created_at : string,
    full_name? : string,
    surname? : string,
    email? : string
    password : string,
    privileges : string,
}

export type Expense = {
    id : string,
    created_at : string,
    product? : string,
    product_id?: string;
    description? : string,
    pricing? : number,
}
