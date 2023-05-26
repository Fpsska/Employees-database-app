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

interface IgeneralColumnProps {
    title: string;
    width?: number;
    editable?: boolean;
    render?: (arg1: any, arg2: Icontact) => void;
    sorter?: (arg1: any, arg2: any) => void;
}

export interface IcolumnChildren extends IgeneralColumnProps {
    key: string;
    dataIndex: string;
}

export interface Icolumn extends IgeneralColumnProps {
    key?: string;
    dataIndex?: string;
    hidden?: boolean;
    fixed?: string;
    align?: string;
    children?: IcolumnChildren[];
}
