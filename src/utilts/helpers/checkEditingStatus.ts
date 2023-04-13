import { Icontact } from 'types/tableSliceTypes';

// /. imports

export function checkEditingStatus(
    record: Icontact,
    editingKey: string
): boolean {
    return record.key.toString() === editingKey;
}
