import { Bar, Line } from "react-chartjs-2";
import React from 'react'
import {Chart as ChartJS} from "chart.js/auto"
const BarChart = ({ChartData, options}) => {
  return (
      <Line className="" width={800} height={300} data={ChartData} options={options}/>
  )
}

export default BarChart;