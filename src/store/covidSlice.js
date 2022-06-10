import { createSlice } from "@reduxjs/toolkit";
import countries from "../countries/countries.json"

const covidSlice = createSlice({
    name: "covid",
    initialState: {
        covidData: [],
        loading: true,
        country: [],
        countries: countries.countries,
        countryLoading : false
        
    },
    reducers: {
        setCovidData: (state, action) => {
            state.covidData = action.payload;
            state.loading = false;
        },
        setCountry: (state, action) => {
            state.country = state.countries.find(country => country.name === action.payload);
            state.countryLoading = false;
        },
        setLoading: (state, action) => {
            state.countryLoading = true
        }
    }
})

export default covidSlice;
export const covicSliceActions = covidSlice.actions;