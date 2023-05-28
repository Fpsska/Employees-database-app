import { Icontact } from 'types/tableSliceTypes';

// /. imports

type IomitContact = Omit<Icontact, 'key' | 'serialNumber' | 'isEditable'>;

// /. types

export function makeMultipleContactsFiltering(
    obj: Icontact,
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
