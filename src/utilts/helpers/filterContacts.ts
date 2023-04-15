export function makeMultipleContactsFiltering(
    obj: any,
    value: string
): boolean {
    const objCopy: any = JSON.parse(JSON.stringify(obj));

    const wrongKeys: string[] = ['key', 'serialNumber', 'isEditable'];

    const validKeys: string[] = Object.keys(obj).filter(
        (key: string) => !wrongKeys.includes(key)
    );

    return validKeys.some((key: string) =>
        RegExp(value, 'gi').test(objCopy[key])
    );
}
