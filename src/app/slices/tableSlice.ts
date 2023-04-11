import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchContactsData } from 'app/api/fetchContactsData';

interface tableSliceTypes {
    contactsData: any[];
    isContactsDataLoading: boolean;
    fetchContactsDataStatus: string;
    fetchContactsDataError: null | string;
}

// /. interfaces

const initialState: tableSliceTypes = {
    contactsData: [],
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
            state.contactsData = contactsData;
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

export const { switchContactsDataLoadingStatus } = tableSlice.actions;

export default tableSlice.reducer;
