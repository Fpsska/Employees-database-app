export function formatDataToPreview(
    currentPage: number,
    itemPerPage: number,
    data: any[]
): any[] {
    if (!data || data.length <= 0) return [];

    const startEl = (currentPage - 1) * itemPerPage; // (1 - 1) * 8 = 0
    const endEl = startEl + itemPerPage; // 0 + 8 = 8
    const visibleItems = data.slice(startEl, endEl);

    return visibleItems;
}
