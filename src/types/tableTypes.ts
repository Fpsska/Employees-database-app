import { type Key } from 'react';

import { type ColumnType, type ColumnGroupType } from 'antd/es/table';

// /. imports

export type Contact = {
    key: Key;
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
};

type ExtendedContact = Contact & {
    editable?: boolean;
    hidden?: boolean;
};

type CustomColumnType = ColumnType<ExtendedContact> & {
    editable?: boolean;
    hidden?: boolean;
};
type CustomColumnGroupType = Omit<
    ColumnGroupType<ExtendedContact>,
    'children'
> & {
    editable?: boolean;
    hidden?: boolean;
    children?: CustomColumns[];
};

// Объединенный тип для колонок
export type CustomColumns = CustomColumnType | CustomColumnGroupType;
export type Columns = CustomColumns[];
