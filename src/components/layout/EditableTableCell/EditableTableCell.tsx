import { type FC, type ReactNode } from 'react';

import { Form, Input } from 'antd';

// /. imports

interface IEditableTableCell {
    editing: boolean;
    dataIndex: string;
    title: string;
    children: ReactNode;
}

const EditableTableCell: FC<IEditableTableCell> = ({
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
