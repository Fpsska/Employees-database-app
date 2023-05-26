import { Icontact, IcolumnChildren } from 'types/tableSliceTypes';

import { checkEditingStatus } from './checkEditingStatus';

// /. imports

export function mergeNestedCol(
    childrenData: IcolumnChildren[],
    editingKey: string
): IcolumnChildren[] {
    const mergedChildColumns = childrenData.map((childCol: IcolumnChildren) => {
        if (childCol.editable) {
            return {
                ...childCol,
                onCell: (record: Icontact) => ({
                    record,
                    dataIndex: childCol.dataIndex,
                    title: childCol.title,
                    editing: checkEditingStatus(record, editingKey)
                })
            };
        } else {
            return childCol;
        }
    });

    return mergedChildColumns;
}
