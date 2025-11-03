import type { Contact } from '../../types/tableTypes';

// /. imports

type FilteredContact = Omit<Contact, 'key' | 'serialNumber' | 'isEditable'>;

// /. types

const wrongKeys: string[] = ['key', 'serialNumber', 'isEditable'];

export function makeMultipleContactsFiltering(
    contact: Contact,
    value: string
): boolean {
    console.log(value);
    const validKeys: string[] = Object.keys(contact).filter(
        (key: string) => !wrongKeys.includes(key)
    );

    return validKeys.some((key: string) => {
        const targetObjValue = contact[key as keyof FilteredContact];

        if (typeof targetObjValue === 'string') {
            return RegExp(value, 'gi').test(targetObjValue);
        }
        if (typeof targetObjValue === 'number') {
            return targetObjValue === parseFloat(value);
        }
    });
}
