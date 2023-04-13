export interface Icontact {
    key: React.Key;
    serialNumber: number;
    name: string;
    id: number;
    phone: string;
    gender: string;
    birthday: string;
    subway: string;
    address: string;
    bank: string;
    cardNum: string;
    citizenship: string;
    passport: string;
    passportProvider: string;
    validity: string;
    birthplace: string;
    residencePlace: string;
    patent: string;
    SNILS: string;
    TIL: string;
    medicalBook: string;
    position: string;
    subdivision: string;
    decision: string;
    sourse: string;
    date: string;
    note: string;
}

export interface Icolumn {
    title: string;
    sorter?: (arg1: any, arg2: any) => void;
    key?: string;
    dataIndex?: string;
    width?: string | number;
    hidden?: boolean;
    fixed?: string;
    editable?: boolean;
    align?: string;
    children?: any[];
    render?: any;
}
