import { type FC, type ReactNode, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { Table as AntTable, Empty, Form } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

import './table.scss';

import { tableStore } from '../../../store/table.store';

import { useTableData } from './hooks/useTableData';
import EditableCell from './components/EditableCell';

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
        filteredContacts,
        tableEditingKey,
        fetchStatus,
        isDataLoading,
        isEditingMode,
        // actions
        setTableEditingKey
    } = tableStore;

    const [form] = Form.useForm();
    const { columns, dataSource } = useTableData();

    // /. hooks

    const isTableDataEmpty =
        !filteredContacts.length || fetchStatus !== 'success';

    // /. variables

    // TODO
    // useEffect(() => {
    // show loader on pagination actions
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
                        cell: EditableCell
                    }
                }}
                columns={columns}
                dataSource={dataSource}
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
