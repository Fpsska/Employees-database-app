import { createAsyncThunk } from '@reduxjs/toolkit';

// /. imports

export const fetchContactsData = createAsyncThunk(
    'mainSlice/fetchAlbumData',
    async (_, { rejectWithValue }) => {
        try {
            const URL = 'https://h2o-backend.vercel.app/api/data';

            const response = await fetch(URL);

            if (!response.ok) {
                console.error(
                    'some error with response of h2o-backend.vercel.app'
                );
            }

            const data = await response.json();
            return data;
        } catch (err: any) {
            console.error(err || err.message);
            return rejectWithValue(err.message);
        }
    }
);
