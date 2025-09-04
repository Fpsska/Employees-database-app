import type { HeaderNavigation } from '../types/dataTypes';

// /. imports

export const navigationData: HeaderNavigation[] = [
    {
        id: 1,
        text: 'База анкет сотрудников',
        href: 'employees-info-database',
        isActive: false
    },
    {
        id: 2,
        text: 'Общая база сотрудников',
        href: '/',
        isActive: true
    },
    {
        id: 3,
        text: 'База сотрудников',
        href: 'employees-database',
        isActive: false
    },
    {
        id: 4,
        text: 'Календарь сотрудников',
        href: 'calendar',
        isActive: false
    },
    {
        id: 5,
        text: 'Тестовый раздел',
        href: 'testing',
        isActive: false
    },
    {
        id: 6,
        text: 'Тестовый раздел',
        href: 'testing',
        isActive: false
    },
    {
        id: 7,
        text: 'Тестовый раздел',
        href: 'testing',
        isActive: false
    },
    {
        id: 8,
        text: 'Тестовый раздел',
        href: 'testing',
        isActive: false
    }
];
