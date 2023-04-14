import React, { useState, useEffect } from 'react';

import { Table as AntTable, Empty, Typography, Popconfirm, Form } from 'antd';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import { updateFilteredContactsData } from 'app/slices/tableSlice';

import { Icontact, Icolumn } from 'types/tableSliceTypes';

import EditableTableCell from 'components/layout/EditableTableCell/EditableTableCell';

import { mergeNestedCol } from 'utilts/helpers/mergeNestedCol';

import { checkEditingStatus } from 'utilts/helpers/checkEditingStatus';

import { formatDataToPreview } from 'utilts/helpers/formatDataToPreview';

import { checkValidity } from 'utilts/helpers/checkValidity';

import './table.scss';

// /. imports

const Table: React.FC = () => {
    const {
        filteredContactsData,
        isContactsDataLoading,
        fetchContactsDataError,
        itemPerPage,
        currentPage,
        isEditingMode
    } = useAppSelector(state => state.tableSlice);

    const [editingKey, setEditingKey] = useState<string>('');

    const [form] = Form.useForm();

    const dispatch = useAppDispatch();

    // /. hooks

    const isTableDataEmpty =
        filteredContactsData.length <= 0 || !fetchContactsDataError;

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

    const dataEmptyMarkup: JSX.Element = (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={'no data'}
        />
    );

    const columnsData: Icolumn[] = [
        {
            title: 'ACTION',
            align: 'center',
            dataIndex: 'action',
            fixed: 'left',
            width: 120,
            hidden: true,
            render: (_: any, record: Icontact) => {
                const editable = checkEditingStatus(record, editingKey);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => onButtonSaveClick(record.key)}
                            style={{ marginRight: 8 }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm
                            title="Sure to cancel?"
                            onConfirm={onButtonCancelClick}
                        >
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link
                        disabled={!!editingKey}
                        onClick={() => {
                            onEditClick(record, record.key);
                        }}
                    >
                        Edit
                    </Typography.Link>
                );
            }
        },
        // /. action col
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
            editable: true,
            sorter: (a: any, b: any) => a.name.localeCompare(b.name)
        },
        {
            title: 'Основная информация',
            children: [
                {
                    title: 'ID номер',
                    dataIndex: 'id',
                    key: 'id',
                    width: 150,
                    editable: true
                },
                {
                    title: 'Телефона',
                    dataIndex: 'phone',
                    key: 'phone',
                    width: 120,
                    editable: true
                },
                {
                    title: 'Пол',
                    dataIndex: 'gender',
                    key: 'gender',
                    width: 100,
                    editable: true,
                    sorter: (a: any, b: any) => a.gender.localeCompare(b.gender)
                },
                {
                    title: 'Дата рождения',
                    dataIndex: 'birthday',
                    key: 'birthday',
                    width: 140,
                    editable: true
                },
                {
                    title: 'Метро',
                    dataIndex: 'subway',
                    key: 'subway',
                    width: 100,
                    editable: true,
                    sorter: (a: any, b: any) => a.subway.localeCompare(b.subway)
                },
                {
                    title: 'Адрес проживания',
                    dataIndex: 'address',
                    key: 'address',
                    width: 180,
                    editable: true
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
                    width: 100,
                    editable: true
                },
                {
                    title: 'Номер карты',
                    dataIndex: 'cardNum',
                    key: 'cardNum',
                    width: 170,
                    editable: true
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
                    width: 130,
                    editable: true,
                    sorter: (a: any, b: any) =>
                        a.citizenship.localeCompare(b.citizenship)
                },
                {
                    title: 'Паспорт',
                    dataIndex: 'passport',
                    key: 'passport',
                    width: 120,
                    editable: true
                },
                {
                    title: 'Кем выдан',
                    dataIndex: 'passportProvider',
                    key: 'passportProvider',
                    width: 190,
                    editable: true
                },
                {
                    title: 'Срок действия',
                    dataIndex: 'validity',
                    key: 'validity',
                    width: 130,
                    editable: true,
                    render(text: string, record: any) {
                        return {
                            children: (
                                <span
                                    className={`cell-content ${checkValidity(
                                        record.validity
                                    )}`}
                                >
                                    {text}
                                </span>
                            )
                        };
                    }
                },
                {
                    title: 'Место рождения',
                    dataIndex: 'birthplace',
                    key: 'birthplace',
                    width: 160,
                    editable: true
                },
                {
                    title: 'Адрес прописки',
                    dataIndex: 'residencePlace',
                    key: 'residencePlace',
                    width: 190,
                    editable: true
                },
                {
                    title: 'Патент',
                    dataIndex: 'patent',
                    key: 'patent',
                    width: 150,
                    editable: true,
                    sorter: (a: any, b: any) => a.patent.localeCompare(b.patent)
                },
                {
                    title: 'СНИЛС',
                    dataIndex: 'SNILS',
                    key: 'SNILS',
                    width: 160,
                    editable: true
                },
                {
                    title: 'ИНН',
                    dataIndex: 'TIL',
                    key: 'TIL',
                    width: 150,
                    editable: true
                },
                {
                    title: 'Мед.книжка',
                    dataIndex: 'medicalBook',
                    key: 'medicalBook',
                    width: 120,
                    editable: true
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
                    width: 120,
                    editable: true,
                    sorter: (a: any, b: any) =>
                        a.position.localeCompare(b.position)
                },
                {
                    title: 'Подразделение',
                    dataIndex: 'subdivision',
                    key: 'subdivision',
                    width: 150,
                    editable: true,
                    sorter: (a: any, b: any) =>
                        a.subdivision.localeCompare(b.subdivision)
                },
                {
                    title: 'Решение',
                    dataIndex: 'decision',
                    key: 'decision',
                    width: 130,
                    editable: true,
                    sorter: (a: any, b: any) =>
                        a.decision.localeCompare(b.decision)
                },
                {
                    title: 'Источник',
                    dataIndex: 'sourse',
                    key: 'sourse',
                    width: 130,
                    editable: true
                },
                {
                    title: 'Дата',
                    dataIndex: 'date',
                    key: 'date',
                    width: 130,
                    editable: true
                },
                {
                    title: 'Примечание',
                    dataIndex: 'note',
                    key: 'note',
                    width: 220,
                    editable: true
                }
            ]
        }
        // /. Информация от HR
    ];

    const mergedColumns: Icolumn[] = columnsData.map((col: Icolumn) => {
        if (col.children) {
            return {
                ...col,
                children: mergeNestedCol(col.children, editingKey)
            };
        }
        if (col.editable) {
            return {
                ...col,
                onCell: (record: Icontact) => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: checkEditingStatus(record, editingKey)
                })
            };
        } else {
            return col;
        }
    });

    const outputTableData: Icolumn[] = isEditingMode
        ? mergedColumns
        : mergedColumns.filter(col => !col.hidden);

    // /. variables

    const onEditClick = (record: Partial<Icontact>, key: React.Key): void => {
        form.setFieldsValue({
            ...record
        });
        setEditingKey(key.toString());
    };

    const onButtonCancelClick = (): void => {
        setEditingKey('');
    };

    const onButtonSaveClick = async (key: React.Key): Promise<any> => {
        try {
            const row = (await form.validateFields()) as Icontact;
            const newData = [...filteredContactsData];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                dispatch(updateFilteredContactsData(newData));
                setEditingKey('');
            } else {
                newData.push(row);
                dispatch(updateFilteredContactsData(newData));
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    // /. functions

    return (
        <Form
            form={form}
            component={false}
        >
            <AntTable
                className="table"
                components={{
                    body: {
                        cell: EditableTableCell
                    }
                }}
                columns={outputTableData as any[]}
                dataSource={formatDataToPreview(
                    currentPage,
                    itemPerPage,
                    filteredContactsData
                )}
                bordered
                size="middle"
                scroll={{ x: 'max-content', y: 'undefined' }}
                pagination={false}
                loading={isContactsDataLoading}
                locale={{
                    emptyText: isTableDataEmpty
                        ? dataEmptyMarkup
                        : dataErrorMarkup
                }}
            />
        </Form>
    );
};

export default Table;
