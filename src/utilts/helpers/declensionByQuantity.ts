export function declensionByQuantity(quantity: number, array: any[]): string {
    quantity = Math.abs(quantity) % 100;

    const case_1 = quantity % 10;

    if (quantity > 10 && quantity < 20) {
        return array[2];
    }
    if (case_1 > 1 && case_1 < 5) {
        return array[1];
    }
    if (case_1 == 1) {
        return array[0];
    }

    return array[2];
}
