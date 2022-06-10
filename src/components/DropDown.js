import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { covicSliceActions } from "../store/covidSlice";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
function DropDown() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.covid.loading);
  const handleChange = (country) => {
    console.log(country);
    dispatch(covicSliceActions.setCountry(country));
  };
  const country = useSelector((state) => state.covid.country);
  console.log(country);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(covicSliceActions.setLoading());
      axios(`https://covid19.mathdro.id/api/countries/${country.name}`).then(
        (res) => dispatch(covicSliceActions.setCovidData(res.data))
      );
    };
    fetchData();
  }, [country, dispatch]);

  const countries = useSelector((state) => state.covid.countries);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const array = countries.map((country) => country.name);
  return (
    <div>
      <Autocomplete
        className="mx-auto"
        disablePortal
        id="combo-box-demo"
        options={array}
        onChange={(event, value) => handleChange(value)}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Country" color="primary" />
        )}
      />
    </div>
  );
}

export default DropDown;
