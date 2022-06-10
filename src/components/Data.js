import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { covicSliceActions } from "../store/covidSlice";
import Graph from "./Graph";
import DropDown from "./DropDown";
function Data() {
  const isLoading = useSelector((state) => state.covid.loading);
  const data = useSelector((state) => state.covid.covidData);
  const dispatch = useDispatch();
  const getData = async () => {
    axios("https://covid19.mathdro.id/api").then((res) =>
      dispatch(covicSliceActions.setCovidData(res.data))
    );
  };
  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);
  const dataset = {
    labels: ["Confirmed", "Deaths"],
    datasets: [
      {
        label: "Covid-19",
        data: [data.confirmed.value, data.deaths.value],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(255, 159, 64, 1)"],
        borderColor: ["rgba(15, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  console.log(dataset);
  return (
    <>
      <div>
        <div
          className="card card-body mx-2 my-5 "
          style={{ width: "15rem", height: "12rem", backgroundColor: "red" }}
        >
          <h5 className="card-title"> Infected: </h5>
          <p className="card-text">{data.confirmed.value.toLocaleString()}</p>
          <h6>Last updated: {data.lastUpdate.substring(0, 10)}</h6>
        </div>
        <div
          className="card card-body mx-2 my-5 "
          style={{ width: "15rem", height: "12rem", backgroundColor: "teal" }}
        >
          <h5 className="card-title">Recovered: </h5>
          <p className="card-text">{data.recovered.value}</p>
          <h6>Last updated: {data.lastUpdate.substring(0, 10)}</h6>
        </div>
        <div
          className="card card-body mx-2 my-5"
          style={{ width: "15rem", height: "12rem", backgroundColor: "gray" }}
        >
          <h5 className="card-title"> Deaths: </h5>
          <p className="card-text">{data.deaths.value.toLocaleString()}</p>
          <h6>Last updated: {data.lastUpdate.substring(0, 10)}</h6>
        </div>

      
      </div>
      <DropDown />
      <div style={{ width: "50rem" }} className="mx-auto">
        <Graph data={dataset} />
      </div>
    </>
  );
}

export default Data;
