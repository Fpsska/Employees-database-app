import { type Key } from 'react';

// /. imports

export function checkEditingStatus(recordKey: Key, editingKey: Key): boolean {
    return recordKey === editingKey;
}
