import React from 'react';

import { Table as AntTable, Pagination, Empty } from 'antd';

import { useAppSelector } from 'app/hooks';

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

// /. interfaces

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
                width: 190
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
                width: 190
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
                width: 120
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

const Table: React.FC = () => {
    const { contactsData, isContactsDataLoading, fetchContactsDataError } =
        useAppSelector(state => state.tableSlice);

    // /. hooks

    const isTableDataExist = contactsData.length > 0;

    const dataErrorMarkup: JSX.Element = (
        <Empty
            image={Empty.PRESENTED_IMAGE_DEFAULT}
            description={
                <span style={{ color: 'red' }}>
                    Error of fetchContactsData promise:
                    {fetchContactsDataError}
                </span>
            }
        />
    );

    return (
        <>
            <AntTable
                className="table"
                columns={columns}
                dataSource={isTableDataExist ? contactsData : []}
                bordered
                size="small"
                scroll={{ x: 'max-content', y: '500px' }}
                pagination={false}
                loading={isContactsDataLoading}
                locale={{
                    emptyText: isContactsDataLoading ? null : dataErrorMarkup
                }}
            />
            <Pagination
                className="pagination"
                total={contactsData.length}
                showTotal={(total, range) =>
                    `показано ${[0]}-${range[1]} из ${total} результатов`
                }
                defaultPageSize={10}
                defaultCurrent={1}
            />
        </>
    );
};

export default Table;
