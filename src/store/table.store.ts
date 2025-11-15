import { makeAutoObservable, runInAction } from 'mobx';

import { type Key } from 'react';

import { makeMultipleContactsFiltering } from '../utilts/helpers/filterContacts';

import type { Contact } from '../types/tableTypes';

class TableStore {
    contacts: Contact[] = [];
    inputSearchValue = '';
    fetchStatus: 'pending' | 'success' | 'failed' | null = null;
    isLoading = true;
    isEditingMode = false;
    tableEditingKey: Key | null = null;
    itemPerPage = 8;
    currentPage = 1;

    constructor() {
        makeAutoObservable(this);
    }

    // COMPUTED VALUES
    get filteredContacts() {
        return this.contacts.filter((contact) =>
            makeMultipleContactsFiltering(contact, this.inputSearchValue)
        );
    }

    // ACTIONS
    switchLoadingStatus = (status: boolean) => {
        this.isLoading = status;
    };
    updateContactById = (id: Key, changes: Partial<Contact>) => {
        this.contacts = this.contacts.map((contact) =>
            contact.key === id ? { ...contact, ...changes } : contact
        );
    };
    setInputSearchValue = (value: string) => {
        this.inputSearchValue = value;
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
    setTableEditingKey = (value: Key | null) => {
        this.tableEditingKey = value;
    };
    // ASYNC ACTIONS
    fetchContactsData = async () => {
        const URL =
            'https://employees-database-app-backend.vercel.app/api/data/';
        this.fetchStatus = 'pending';
        this.isLoading = true;

        try {
            const response = await fetch(URL);

            if (!response.ok) {
                throw new Error(
                    'some error with response of h2o-backend.vercel.app'
                );
            }

            const data = await response.json();
            if (!data?.contactsData)
                throw new Error('contactsData key is missing in response');

            runInAction(() => {
                this.contacts = data.contactsData;
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
                this.isLoading = false;
            });
        }
    };
}

export const tableStore = new TableStore();
