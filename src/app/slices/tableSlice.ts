import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchContactsData } from 'app/api/fetchContactsData';

import { Icontact } from 'types/tableSliceTypes';

interface tableSliceTypes {
    contactsData: Icontact[];
    filteredContactsData: Icontact[];
    isContactsDataLoading: boolean;
    fetchContactsDataStatus: string;
    fetchContactsDataError: null | string;
}

// /. interfaces

const initialState: tableSliceTypes = {
    contactsData: [],
    filteredContactsData: [],
    isContactsDataLoading: true,
    fetchContactsDataStatus: '',
    fetchContactsDataError: null
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

            state.filteredContactsData = state.contactsData.filter(item =>
                RegExp(enteredValue, 'gi').test(item.name)
            );
        }
    },
    extraReducers: {
        [fetchContactsData.pending.type]: state => {
            state.fetchContactsDataStatus = 'loading';
            state.fetchContactsDataError = null;
        },
        [fetchContactsData.fulfilled.type]: (
            state,
            action: PayloadAction<any>
        ) => {
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
                    serialNumber: idx + 1
                })
            );

            state.contactsData = outputData;
            state.filteredContactsData = outputData;
            state.fetchContactsDataStatus = 'success';
        },
        [fetchContactsData.rejected.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.fetchContactsDataStatus = 'failed';
            state.fetchContactsDataError = action.payload;
        }
    }
});

export const { switchContactsDataLoadingStatus, filterContactsData } =
    tableSlice.actions;

export default tableSlice.reducer;
