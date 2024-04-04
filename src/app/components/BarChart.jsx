import { Bar } from "react-chartjs-2";
import React from 'react'
import {Chart as ChartJS} from "chart.js/auto"
const BarChart = ({ChartData}) => {
  return (
    <div className="w-full">
      <Bar data={ChartData}/>
    </div>
  )
}

export default BarChart