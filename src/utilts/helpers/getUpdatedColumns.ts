import { type Key } from 'react';
import type { CustomColumns } from '../../types/tableTypes';
import { checkEditingStatus } from './checkEditingStatus';

// /. imports

export function getUpdatedColumns(
    columns: CustomColumns[],
    editingKey: Key | null
): CustomColumns[] {
    const handleColumn = (column: CustomColumns): CustomColumns => {
        if (!('editable' in column) || column.editable === false) return column;

        return {
            ...column,
            // @ts-ignore
            onCell: (record) => ({
                record,
                editable: checkEditingStatus(record.key, editingKey)
            }),
            children:
                'children' in column
                    ? column.children?.map(handleColumn)
                    : undefined
        };
    };

    return columns.map(handleColumn);
}
