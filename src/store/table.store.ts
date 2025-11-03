import { makeAutoObservable, runInAction } from 'mobx';

import { type Key } from 'react';

import { makeMultipleContactsFiltering } from '../utilts/helpers/filterContacts';

import type { Contact } from '../types/tableTypes';

class TableStore {
    contactsData: Contact[] = [];
    filteredContactsData: Contact[] = [];
    fetchStatus: 'pending' | 'success' | 'failed' | null = null;
    isDataLoading = true;
    isEditingMode = false;
    tableEditingKey: Key = ''; // TODO: relocate to local state?
    itemPerPage = 8;
    currentPage = 1;

    constructor() {
        makeAutoObservable(this);
    }

    // ACTIONS
    switchContactsDataLoadingStatus = (status: boolean) => {
        this.isDataLoading = status;
    };
    filterContactsData = (value: string) => {
        this.filteredContactsData = this.contactsData.filter((contact) =>
            makeMultipleContactsFiltering(contact, value)
        );
    };
    updateFilteredContactsData = (data: Contact[]) => {
        this.filteredContactsData = data;
        this.contactsData = data;
    };
    setCurrentPageValue = (value: number) => {
        this.currentPage = value;
    };
    setItemsPerPage = (value: number) => {
        this.itemPerPage = value;
    };
    switchEditingMode = (status: boolean) => {
        this.isEditingMode = status;
    };
    setTableEditingKey = (value: Key) => {
        this.tableEditingKey = value;
    };
    // ASYNC ACTIONS
    fetchContactsData = async () => {
        const URL =
            'https://employees-database-app-backend.vercel.app/api/data/';
        this.fetchStatus = 'pending';
        this.isDataLoading = true;

        try {
            const response = await fetch(URL);

            if (!response.ok) {
                throw new Error(
                    'some error with response of h2o-backend.vercel.app'
                );
            }

            const { contactsData }: Record<'contactsData', Contact[]> =
                await response.json();

            const result = contactsData.map((contact) => ({
                ...contact,
                serialNumber: contact.id,
                isEditable: false
            }));

            runInAction(() => {
                this.contactsData = result;
                this.filteredContactsData = result;
                this.fetchStatus = 'success';
            });
        } catch (err: any) {
            runInAction(() => {
                const error = err || err.message;
                console.error(error);
                this.fetchStatus = error;
            });
        } finally {
            runInAction(() => {
                this.isDataLoading = false;
            });
        }
    };
}

export const tableStore = new TableStore();
