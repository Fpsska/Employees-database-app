import { type FC, type Key, type ReactNode, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { Table as AntTable, Empty, Typography, Popconfirm, Form } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

import './table.scss';

import { checkEditingStatus } from '../../../utilts/helpers/checkEditingStatus';
import { checkValidity } from '../../../utilts/helpers/checkValidity';
// import { getUpdatedColumns } from '../../../utilts/helpers/mergeNestedCol';

import EditableTableCell from '../EditableTableCell/EditableTableCell';
import { formatDataToPreview } from '../../../utilts/helpers/formatDataToPreview';

import { tableStore } from '../../../store/table.store';

import type { Contact, ColumnsType } from '../../../types/tableTypes';

// /. imports

const dataEmptyMarkup: ReactNode = (
    <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={'no data'}
    />
);

const dataErrorMarkup: ReactNode = (
    <Empty
        image={Empty.PRESENTED_IMAGE_DEFAULT}
        description={
            <span style={{ color: 'red' }}>
                Error of fetchContactsData promise
            </span>
        }
    />
);

const Table: FC = () => {
    const {
        filteredContactsData,
        tableEditingKey,
        itemPerPage,
        currentPage,
        fetchStatus,
        isDataLoading,
        isEditingMode,
        // actions
        setTableEditingKey,
        updateFilteredContactsData
    } = tableStore;

    const [form] = Form.useForm();

    // /. hooks

    const isTableDataEmpty =
        !filteredContactsData.length || fetchStatus !== 'success';

    const columns: ColumnsType = [
        {
            title: 'ACTION',
            key: 'action',
            dataIndex: 'action',
            width: 120,
            align: 'center',
            fixed: 'left',
            editable: false,
            hidden: !isEditingMode,
            render: (_, record) => {
                const isEditable = checkEditingStatus(
                    record.key,
                    tableEditingKey
                );
                return isEditable ? (
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
                        // disabled={tableEditingKey === null}
                        onClick={() => onEditCellClick(record)}
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
            key: 'serialNumber',
            width: 50,
            fixed: 'left',
            editable: false
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
            editable: false,
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
                    width: 100,
                    sorter: (a, b) => a.gender.localeCompare(b.gender)
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
                    width: 100,
                    sorter: (a, b) => a.subway.localeCompare(b.subway)
                },
                {
                    title: 'Адрес проживания',
                    dataIndex: 'address',
                    key: 'address',
                    width: 180
                }
            ]
        },
        // /. Основная информация
        {
            title: 'Банковская информация',
            editable: false,
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
            editable: false,
            children: [
                {
                    title: 'Гражданство',
                    dataIndex: 'citizenship',
                    key: 'citizenship',
                    width: 130,
                    sorter: (a, b) => a.citizenship.localeCompare(b.citizenship)
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
                    width: 130,
                    render: (text: string, record: Contact) => {
                        return (
                            <span
                                className={`cell-content ${checkValidity(
                                    record.validity
                                )}`}
                            >
                                {text}
                            </span>
                        );
                    }
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
                    width: 150,
                    sorter: (a, b) => a.patent.localeCompare(b.patent)
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
            editable: false,
            children: [
                {
                    title: 'Должность',
                    dataIndex: 'position',
                    key: 'position',
                    width: 120,
                    sorter: (a, b) => a.position.localeCompare(b.position)
                },
                {
                    title: 'Подразделение',
                    dataIndex: 'subdivision',
                    key: 'subdivision',
                    width: 150,
                    sorter: (a, b) => a.subdivision.localeCompare(b.subdivision)
                },
                {
                    title: 'Решение',
                    dataIndex: 'decision',
                    key: 'decision',
                    width: 130,
                    sorter: (a, b) => a.decision.localeCompare(b.decision)
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

    // const updatedColumns = getUpdatedColumns(columns, tableEditingKey);
    // console.log('updatedColumns>', updatedColumns);
    // const filteredColumns = updatedColumns?.filter((col) => !col.hidden);

    // /. variables

    const onEditCellClick = (record: Contact): void => {
        console.log('new KEY>', record.key);
        form.setFieldsValue(record);
        setTableEditingKey(record.key);
    };

    const onButtonCancelClick = (): void => {
        setTableEditingKey('');
    };

    const onButtonSaveClick = async (key: Key): Promise<void> => {
        // try {
        //     const row = await form.validateFields();
        //     const newData: Contact[] = [...filteredContactsData];
        //     const index = newData.findIndex((item) => key === item.key);

        //     if (index > -1) {
        //         const item = newData[index];
        //         newData.splice(index, 1, {
        //             ...item,
        //             ...row
        //         });
        //         updateFilteredContactsData(newData);
        //         setTableEditingKey('');
        //     } else {
        //         newData.push(row);
        //         updateFilteredContactsData(newData);
        //         setTableEditingKey('');
        //     }
        // } catch (error) {
        //     console.error('Validate Failed:', error);
        // }
        console.log('onButtonSaveClick');
    };

    // /. functions

    // TODO
    // useEffect(() => {
    //     // show loader on pagination actions
    //     switchContactsDataLoadingStatus(true);
    //     setTimeout(() => {
    //         switchContactsDataLoadingStatus(false);
    //     }, 600);
    // }, [itemPerPage, currentPage]);

    useEffect(() => {
        if (!isEditingMode || !tableEditingKey) return;

        const controller = new AbortController();

        const onDocumentKeyEvent = (e: KeyboardEvent): void => {
            if (e.code === 'Escape') setTableEditingKey('');
        };

        document.addEventListener('keydown', onDocumentKeyEvent, {
            signal: controller.signal
        });

        return () => controller.abort();
    }, [isEditingMode, tableEditingKey, setTableEditingKey]);

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
                columns={columns}
                dataSource={formatDataToPreview<Contact>(
                    currentPage,
                    itemPerPage,
                    filteredContactsData
                )}
                bordered
                size="middle"
                scroll={{ x: 'max-content', y: '430px' }}
                pagination={false}
                loading={{
                    indicator: <LoadingOutlined />,
                    spinning: isDataLoading
                }}
                locale={{
                    emptyText: isTableDataEmpty
                        ? dataEmptyMarkup
                        : dataErrorMarkup
                }}
            />
        </Form>
    );
};

export default observer(Table);
