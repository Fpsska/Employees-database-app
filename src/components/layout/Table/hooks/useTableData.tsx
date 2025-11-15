import { type Key, useMemo } from 'react';
import { formatDataToPreview } from '../../../../utilts/helpers/formatDataToPreview';
import type { Columns, Contact } from '../../../../types/tableTypes';
import { checkValidity } from '../../../../utilts/helpers/checkValidity';
import { Form, Popconfirm, Typography } from 'antd';
import { tableStore } from '../../../../store/table.store';
import { checkEditingStatus } from '../../../../utilts/helpers/checkEditingStatus';
import { getUpdatedColumns } from '../../../../utilts/helpers/getUpdatedColumns';

export const useTableData = () => {
    const {
        filteredContacts,
        tableEditingKey,
        itemPerPage,
        currentPage,
        isEditingMode,
        // actions
        setTableEditingKey,
        updateContactById
    } = tableStore;

    const [form] = Form.useForm();

    const tempColumns = useMemo(() => {
        const result: Columns = [
            {
                title: 'ACTION',
                key: 'action',
                dataIndex: 'action',
                width: 120,
                align: 'center',
                fixed: 'left',
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
                            onClick={() => onEditCellClick(record)}
                        >
                            Edit
                        </Typography.Link>
                    );
                }
            },
            {
                title: '№',
                dataIndex: 'serialNumber',
                key: 'serialNumber',
                width: 50,
                fixed: 'left'
            },
            {
                title: 'Имя сотрудника',
                dataIndex: 'name',
                key: 'name',
                width: 230,
                editable: true,
                sorter: (a, b) => a.name.localeCompare(b.name)
            },
            // /. general
            {
                title: 'Основная информация',
                editable: true,
                children: [
                    {
                        title: 'ID номер',
                        dataIndex: 'id',
                        key: 'id',
                        width: 150
                    },
                    {
                        title: 'Телефон',
                        dataIndex: 'phone',
                        key: 'phone',
                        editable: true,
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
                        editable: true,
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
                        editable: true,
                        width: 180
                    }
                ]
            },
            // /. Основная информация
            {
                title: 'Банковская информация',
                editable: true,
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
                        editable: true,
                        width: 170
                    }
                ]
            },
            // /. Банковская информация
            {
                title: 'Документы сотрудника',
                editable: true,
                children: [
                    {
                        title: 'Гражданство',
                        dataIndex: 'citizenship',
                        key: 'citizenship',
                        width: 130,
                        sorter: (a, b) =>
                            a.citizenship.localeCompare(b.citizenship)
                    },
                    {
                        title: 'Паспорт',
                        dataIndex: 'passport',
                        key: 'passport',
                        editable: true,
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
                        editable: true,
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
                        editable: true,
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
                        editable: true,
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
                        editable: true,
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
                        sorter: (a, b) =>
                            a.subdivision.localeCompare(b.subdivision)
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

        return result.filter((col) => !col.hidden);
    }, [isEditingMode, tableEditingKey]);

    const columns = useMemo(() => {
        if (!isEditingMode) return tempColumns;
        return getUpdatedColumns(tempColumns, tableEditingKey);
    }, [tempColumns, isEditingMode, tableEditingKey]);

    const dataSource = useMemo<Contact[]>(() => {
        return formatDataToPreview<Contact>(
            currentPage,
            itemPerPage,
            filteredContacts
        );
    }, [filteredContacts, currentPage, itemPerPage]);

    const onEditCellClick = (record: Contact): void => {
        form.setFieldsValue(record);
        setTableEditingKey(record.key);
    };

    const onButtonCancelClick = (): void => {
        setTableEditingKey(null);
    };

    const onButtonSaveClick = async (key: Key): Promise<void> => {
        try {
            const row = await form.validateFields();
            updateContactById(key, row);
            setTableEditingKey(null);
        } catch (error) {
            console.error('Validate Failed:', error);
        }
    };

    return { columns, dataSource, formInstance: form };
};
