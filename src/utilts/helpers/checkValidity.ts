export function checkValidity(date: string): boolean {
    const lastDay = new Date('04/13/2023');
    const currentDate = new Date(date.replace(/[.]/g, '/'));

    // /. variables

    if (currentDate > lastDay) {
        // currentDate is greater than lastDay;
        return true;
    } else if (currentDate < lastDay) {
        // lastDay is greater than currentDate
        return false;
    } else {
        // Both dates are equal
        return false;
    }
}
