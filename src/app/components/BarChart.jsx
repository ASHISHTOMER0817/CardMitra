import { Bar, Line } from "react-chartjs-2";
import React from 'react'
import {Chart as ChartJS} from "chart.js/auto"
const BarChart = ({ChartData}) => {
  return (
      <Line className="" data={ChartData}/>
  )
}

export default BarChart;