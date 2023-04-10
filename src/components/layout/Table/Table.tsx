import React from 'react';

import { Table as AntTable, Pagination } from 'antd';

import type { ColumnsType } from 'antd/es/table';

import './table.scss';

// /. imports

interface dataType {
    key: React.Key;
    serialNumber: number;
    name: string;
    id: number;
    phone: string;
    gender: string;
    birthday: string;
    subway: string;
    address: string;
    //
    bank: string;
    cardNum: string;
    //
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
    //
    position: string;
    subdivision: string;
    decision: string;
    sourse: string;
    date: string;
    note: string;
    //
}

const columns: ColumnsType<dataType> = [
    {
        title: '№',
        dataIndex: 'serialNumber',
        width: 50
    },
    {
        title: 'Имя сотрудника',
        dataIndex: 'name',
        key: 'name',
        width: 230,
        sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
        title: 'Основная информация',
        children: [
            {
                title: 'ID номер',
                dataIndex: 'id',
                key: 'id',
                width: 150
            },
            {
                title: 'Телефона',
                dataIndex: 'phone',
                key: 'phone',
                width: 120
            },
            {
                title: 'Пол',
                dataIndex: 'gender',
                key: 'gender',
                sorter: (a, b) => a.gender.localeCompare(b.gender),
                width: 100
            },
            {
                title: 'Дата рождения',
                dataIndex: 'birthday',
                key: 'birthday',
                width: 140
            },
            {
                title: 'Метро',
                dataIndex: 'subway',
                key: 'subway',
                sorter: (a, b) => a.subway.localeCompare(b.subway),
                width: 100
            },
            {
                title: 'Адрес проживания',
                dataIndex: 'address',
                key: 'address',
                width: 170
            }
        ]
    },
    // /. Основная информация
    {
        title: 'Банковская информация',
        children: [
            {
                title: 'Банк',
                dataIndex: 'bank',
                key: 'bank',
                width: 100
            },
            {
                title: 'Номер карты',
                dataIndex: 'cardNum',
                key: 'cardNum',
                width: 170
            }
        ]
    },
    // /. Банковская информация
    {
        title: 'Документы сотрудника',
        children: [
            {
                title: 'Гражданство',
                dataIndex: 'citizenship',
                key: 'citizenship',
                sorter: (a, b) => a.citizenship.localeCompare(b.citizenship),
                width: 130
            },
            {
                title: 'Паспорт',
                dataIndex: 'passport',
                key: 'passport',
                width: 120
            },
            {
                title: 'Кем выдан',
                dataIndex: 'passportProvider',
                key: 'passportProvider',
                width: 150
            },
            {
                title: 'Срок действия',
                dataIndex: 'validity',
                key: 'validity',
                width: 130
            },
            {
                title: 'Место рождения',
                dataIndex: 'birthplace',
                key: 'birthplace',
                width: 160
            },
            {
                title: 'Адрес прописки',
                dataIndex: 'residencePlace',
                key: 'residencePlace',
                width: 150
            },
            {
                title: 'Патент',
                dataIndex: 'patent',
                key: 'patent',
                sorter: (a, b) => a.patent.localeCompare(b.patent),
                width: 150
            },
            {
                title: 'СНИЛС',
                dataIndex: 'SNILS',
                key: 'SNILS',
                width: 160
            },
            {
                title: 'ИНН',
                dataIndex: 'TIL',
                key: 'TIL',
                width: 150
            },
            {
                title: 'Мед.книжка',
                dataIndex: 'medicalBook',
                key: 'medicalBook',
                width: 200
            }
        ]
    },
    // /. Документы сотрудника
    {
        title: 'Информация от HR',
        children: [
            {
                title: 'Должность',
                dataIndex: 'position',
                key: 'position',
                sorter: (a, b) => a.position.localeCompare(b.position),
                width: 120
            },
            {
                title: 'Подразделение',
                dataIndex: 'subdivision',
                key: 'subdivision',
                sorter: (a, b) => a.subdivision.localeCompare(b.subdivision),
                width: 150
            },
            {
                title: 'Решение',
                dataIndex: 'decision',
                key: 'decision',
                sorter: (a, b) => a.decision.localeCompare(b.decision),
                width: 130
            },
            {
                title: 'Источник',
                dataIndex: 'sourse',
                key: 'sourse',
                width: 130
            },
            {
                title: 'Дата',
                dataIndex: 'date',
                key: 'date',
                width: 130
            },
            {
                title: 'Примечание',
                dataIndex: 'note',
                key: 'note',
                width: 220
            }
        ]
    }
    // /. Информация от HR
];

const data: dataType[] = [];
for (let i = 0; i < 88; i++) {
    data.push({
        key: i,
        serialNumber: i + 1,
        id: Math.floor(Math.random() * 125),
        name: 'John Brown',
        phone: '89764554323',
        gender: 'Мужской',
        birthday: '01.09.2000',
        subway: 'Дыбенко',
        address: 'Санкт-Петербург',
        //
        bank: 'СБЕР',
        cardNum: '3333 4445 4532 3353',
        //
        citizenship: 'РФ',
        passport: '4565 567887',
        passportProvider: 'ТП 44 по СПб и Лен обл',
        validity: '12.09.2024',
        birthplace: 'Казахстан',
        residencePlace: 'Наставников 15 к2 кв33',
        patent: 'Регистрация',
        SNILS: '111-345-344 11',
        TIL: '354790582525',
        medicalBook: '-',
        //
        position: 'Бригадир',
        subdivision: 'В2В',
        decision: 'Принят',
        sourse: 'hh',
        date: '12.09.2022',
        note: 'карта на Максима Вилина'
    });
}

const Table: React.FC = () => {
    return (
        <>
            <AntTable
                columns={columns}
                dataSource={data}
                bordered
                size="large"
                scroll={{ x: 'max-content', y: 'none' }}
                pagination={false}
            />
            <Pagination
                total={data.length}
                showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                }
                defaultPageSize={10}
                defaultCurrent={1}
            />
        </>
    );
};

export default Table;
