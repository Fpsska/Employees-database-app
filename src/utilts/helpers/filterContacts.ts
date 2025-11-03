import type { Contact } from '../../types/tableTypes';

// /. imports

type IomitContact = Omit<Contact, 'key' | 'serialNumber' | 'isEditable'>;

// /. types

export function makeMultipleContactsFiltering(
    obj: Contact,
    value: string
): boolean {
    const wrongKeys: string[] = ['key', 'serialNumber', 'isEditable'];

    const validKeys: string[] = Object.keys(obj).filter(
        (key: string) => !wrongKeys.includes(key)
    );

    return validKeys.some((key: string) => {
        const targetObjValue = obj[key as keyof IomitContact];

        if (typeof targetObjValue === 'string') {
            return RegExp(value, 'gi').test(targetObjValue);
        }
        if (typeof targetObjValue === 'number') {
            return targetObjValue === parseFloat(value);
        }
    });
}
