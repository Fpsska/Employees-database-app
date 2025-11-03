import { type Key } from 'react';

import { type ColumnsType as AntColumnsType } from 'antd/es/table';
import { type TableColumnsType, TableProps } from 'antd';

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

// export type ColumnType = TableColumnsType<Contact> & {
//     isEditable?: boolean;
//     isHidden?: boolean;
// };

// export type ColumnsType = AntColumnsType<Contact> & {
//     isEditable?: boolean;
//     isHidden?: boolean;
// };

// export type ColumnsType = TableProps<Contact>['columns'];
export type ColumnsType = TableColumnsType<Contact> & { hidden?: boolean };

// export interface IcolumnChildren extends GeneralColumnProps {
//     key: string;
//     dataIndex: string;
// }

// export interface Icolumn extends GeneralColumnProps {
//     key?: string;
//     dataIndex?: string;
//     hidden?: boolean;
//     fixed?: string;
//     align?: string;
//     children?: IcolumnChildren[];
// }
