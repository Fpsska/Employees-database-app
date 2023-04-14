<<<<<<< HEAD
export function checkValidity(date: string): string {
    const deadline = new Date('04/13/2023'); // MM/DD/YY

    const givenDate = date.replace(/[.]/g, '/'); // DD.MM.YY => DD/MM/YY
    const [day, month, year] = givenDate.split('/');
    const dateToCompare = new Date(`${month}/${day}/${year}`); // MM/DD/YY

    // /. variables

    // ok (black color + transparent background)
    // bad (white color + red background)
    // cooming (red color + transparent background)

    if (dateToCompare.getTime() < deadline.getTime()) {
        return 'bad';
    } else if (dateToCompare.getTime() > deadline.getTime()) {
        return 'ok';
    } else {
        // Both dates are equal
        return 'cooming';
=======
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
>>>>>>> bfca97099851b4a4643ef07d627e98e1b026f146
    }
}
