import { type Key } from 'react';

// /. imports

export function checkEditingStatus(
    recordKey: Key,
    editingKey: Key | null
): boolean {
    return recordKey === editingKey;
}
