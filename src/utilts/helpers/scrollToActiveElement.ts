import { type RefObject } from 'react';

// /. imports

export function scrollToActiveElement(
    refEl: RefObject<HTMLUListElement>
): void {
    if (!refEl?.current) return;

    const navItems = [...refEl.current.children];
    const parentProps = refEl.current.getBoundingClientRect();

    navItems.forEach((el) => {
        const { width } = el.getBoundingClientRect();

        if (el.classList.contains('active')) {
            const offsetRight =
                parentProps.width - ((el as HTMLElement).offsetLeft - width);
            const scrollPos = parentProps.width - offsetRight - width;

            refEl.current?.scrollTo({
                left: scrollPos,
                behavior: 'smooth'
            });
        }
    });
}
