import { Icontact } from 'types/tableSliceTypes';

import { checkEditingStatus } from './checkEditingStatus';

// /. imports

export function mergingNestedCol(
    childrenData: any[],
    editingKey: string
): Icontact[] {
    const mergedColumns = childrenData.map(col => {
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
            return childrenData;
        }
    });

    return mergedColumns;
}
