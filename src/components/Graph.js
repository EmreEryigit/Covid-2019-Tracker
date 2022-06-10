import React from 'react'
import {Bar} from "react-chartjs-2"
import Chart from 'chart.js/auto';
function Graph(props) {

   console.log(props.data)
    
  return (
    <div>
   <Bar data={props.data}/>
    </div>
  )
}

export default Graph