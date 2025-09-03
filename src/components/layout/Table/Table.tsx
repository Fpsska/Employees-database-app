import { type FC, type Key, type ReactNode, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { Table as AntTable, Empty, Typography, Popconfirm, Form } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

import './table.scss';

import { checkEditingStatus } from '../../../utilts/helpers/checkEditingStatus';
import { checkValidity } from '../../../utilts/helpers/checkValidity';
import { mergeNestedCol } from '../../../utilts/helpers/mergeNestedCol';

import EditableTableCell from '../EditableTableCell/EditableTableCell';
import { formatDataToPreview } from '../../../utilts/helpers/formatDataToPreview';

import { tableStore } from '../../../store/table.store';

import type { Icolumn, Icontact } from '../../../types/tableSliceTypes';

// /. imports

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
        !filteredContactsData ||
        filteredContactsData.length <= 0 ||
        fetchStatus !== 'success';

    const dataErrorMarkup: ReactNode = (
        <Empty
            image={Empty.PRESENTED_IMAGE_DEFAULT}
            description={
                <span style={{ color: 'red' }}>
                    Error of fetchContactsData promise:
                    {fetchStatus}
                </span>
            }
        />
    );

    const dataEmptyMarkup: ReactNode = (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={'no data'}
        />
    );

    const columnsData: Icolumn[] = [
        // TODO
        {
            title: 'ACTION',
            key: 'action',
            dataIndex: 'action',
            width: 120,
            align: 'center',
            fixed: 'left',
            hidden: true,
            render: (_: any, record: Icontact) => {
                const editable = checkEditingStatus(record, tableEditingKey);
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
                        disabled={!!tableEditingKey}
                        onClick={() => {
                            onEditCellClick(record, record.key);
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
            key: 'serialNumber',
            width: 50
        },
        {
            title: 'Имя сотрудника',
            dataIndex: 'name',
            key: 'name',
            width: 230,
            editable: true,
            sorter: (a, b) => a.name.localeCompare(b.name)
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
                    sorter: (a, b) => a.gender.localeCompare(b.gender)
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
                    sorter: (a, b) => a.subway.localeCompare(b.subway)
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
                    sorter: (a, b) => a.citizenship.localeCompare(b.citizenship)
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
                    render: (text: string, record: Icontact) => {
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
                    sorter: (a, b) => a.patent.localeCompare(b.patent)
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
                    sorter: (a, b) => a.position.localeCompare(b.position)
                },
                {
                    title: 'Подразделение',
                    dataIndex: 'subdivision',
                    key: 'subdivision',
                    width: 150,
                    editable: true,
                    sorter: (a, b) => a.subdivision.localeCompare(b.subdivision)
                },
                {
                    title: 'Решение',
                    dataIndex: 'decision',
                    key: 'decision',
                    width: 130,
                    editable: true,
                    sorter: (a, b) => a.decision.localeCompare(b.decision)
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
        // TODO
        if (col.children) {
            return {
                ...col,
                children: mergeNestedCol(col.children, tableEditingKey)
            };
        }
        if (col.editable) {
            return {
                ...col,
                onCell: (record: Icontact) => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: checkEditingStatus(record, tableEditingKey)
                })
            };
        } else {
            return col;
        }
    });

    const outputColumnsTableData: Icolumn[] = isEditingMode
        ? mergedColumns
        : mergedColumns.filter((col: Icolumn) => !col.hidden);

    // /. variables

    const onEditCellClick = (record: Partial<Icontact>, key: Key): void => {
        form.setFieldsValue({
            ...record
        });
        setTableEditingKey(key.toString());
    };

    const onButtonCancelClick = (): void => {
        setTableEditingKey('');
    };

    const onButtonSaveClick = async (key: Key): Promise<any> => {
        try {
            const row = (await form.validateFields()) as Icontact;
            const newData: Icontact[] = [...filteredContactsData];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                updateFilteredContactsData(newData);
                setTableEditingKey('');
            } else {
                newData.push(row);
                updateFilteredContactsData(newData);
                setTableEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
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

        const onDocumentKeyEvent = (e: KeyboardEvent): void => {
            if (e.code === 'Escape') {
                setTableEditingKey('');
            }
        };

        document.addEventListener('keydown', onDocumentKeyEvent);

        return () =>
            document.removeEventListener('keydown', onDocumentKeyEvent);
    }, [isEditingMode, tableEditingKey]);

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
                columns={outputColumnsTableData as any[]}
                dataSource={formatDataToPreview<Icontact>(
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
