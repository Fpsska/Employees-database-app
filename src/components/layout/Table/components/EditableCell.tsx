import { type FC, type ReactNode, memo } from 'react';

import { Form, Input } from 'antd';

// /. imports

interface IEditableCell {
    editable?: boolean;
    dataIndex: string;
    title: string;
    children: ReactNode;
}

const rules = [
    {
        required: true,
        message: 'Поле не может быть пустым!'
    }
];

const EditableCell: FC<IEditableCell> = (props) => {
    const { editable, dataIndex, children, ...restProps } = props;

    return (
        <td {...restProps}>
            {editable ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0, padding: '10px 5px' }}
                    rules={rules}
                >
                    <Input />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditableCellMemo = memo(EditableCell);
export default EditableCellMemo;
