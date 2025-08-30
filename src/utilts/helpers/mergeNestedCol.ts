import { checkEditingStatus } from './checkEditingStatus';

import type { IcolumnChildren, Icontact } from '../../types/tableSliceTypes';

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
