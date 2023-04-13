import React from 'react';

import { Form, Input } from 'antd';

// /. imports

interface propTypes {
    editing: boolean;
    dataIndex: string;
    title: string;
    children: React.ReactNode;
}

const EditableTableCell: React.FC<propTypes> = ({
    editing,
    dataIndex,
    children,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0, padding: '10px 5px' }}
                    rules={[
                        {
                            required: true,
                            message: 'Поле не может быть пустым!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default EditableTableCell;
