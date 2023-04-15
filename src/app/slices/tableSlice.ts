import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import { fetchContactsData } from 'app/api/fetchContactsData';

import { makeMultipleContactsFiltering } from 'utilts/helpers/filterContacts';

import { Icontact } from 'types/tableSliceTypes';

interface tableSliceTypes {
    contactsData: Icontact[];
    filteredContactsData: Icontact[];
    isContactsDataLoading: boolean;
    isEditingMode: boolean;
    fetchContactsDataStatus: string;
    fetchContactsDataError: null | string;
    itemPerPage: number;
    currentPage: number;
}

// /. interfaces

const initialState: tableSliceTypes = {
    contactsData: [],
    filteredContactsData: [],
    isContactsDataLoading: true,
    isEditingMode: false,
    fetchContactsDataStatus: '',
    fetchContactsDataError: null,
    itemPerPage: 8,
    currentPage: 1
};

// /. state

const tableSlice = createSlice({
    name: 'tableSlice',
    initialState,
    reducers: {
        switchContactsDataLoadingStatus(state, action: PayloadAction<boolean>) {
            state.isContactsDataLoading = action.payload;
        },
        filterContactsData(
            state,
            action: PayloadAction<{ enteredValue: string }>
        ) {
            const { enteredValue } = action.payload;
            // /. payload

            state.filteredContactsData = state.contactsData.filter(
                (contact: Icontact) =>
                    makeMultipleContactsFiltering(contact, enteredValue)
            );
        },
        updateFilteredContactsData(state, action: PayloadAction<Icontact[]>) {
            state.filteredContactsData = action.payload;
            state.contactsData = action.payload;
        },
        setCurrentPageValue(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setItemsPerPage(state, action: PayloadAction<number>) {
            state.itemPerPage = action.payload;
        },
        switchEditingMode(state, action: PayloadAction<boolean>) {
            state.isEditingMode = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchContactsData.pending, state => {
                state.fetchContactsDataStatus = 'loading';
                state.fetchContactsDataError = null;
            })
            .addCase(
                fetchContactsData.fulfilled,
                (state, action: PayloadAction<any>) => {
                    const { contactsData } = action.payload;
                    // /. payload

                    const dublicatedData: Icontact[] = [...contactsData];
                    const extendedData: Icontact[] = [
                        ...contactsData,
                        ...dublicatedData
                    ];

                    const outputData: Icontact[] = extendedData.map(
                        ({ ...item }, idx: number) => ({
                            ...item,
                            key: idx,
                            id: Math.floor(Math.random() * item.id),
                            serialNumber: idx + 1,
                            isEditable: false
                        })
                    );

                    state.contactsData = outputData;
                    state.filteredContactsData = outputData;
                    state.fetchContactsDataStatus = 'success';
                }
            )
            .addCase(
                fetchContactsData.rejected,
                (state, action: PayloadAction<any>) => {
                    state.fetchContactsDataStatus = 'failed';
                    state.fetchContactsDataError = action.payload as string;
                }
            );
    }
});

export const {
    switchContactsDataLoadingStatus,
    filterContactsData,
    setCurrentPageValue,
    setItemsPerPage,
    updateFilteredContactsData,
    switchEditingMode
} = tableSlice.actions;

export default tableSlice.reducer;
