import { Bar, Line } from "react-chartjs-2";
import React from 'react'
import {Chart as ChartJS} from "chart.js/auto"
const BarChart = ({ChartData, options}) => {
  return (
      <Line className="" width={800} height={300} data={ChartData} options={options}/>
  )
}

export default BarChart;












// import React from "react";
// import { Line } from "react-chartjs-2";

// const BarChart = ({ ChartData, options }) => {
// 	const responsiveOptions = {
// 		responsive: true,
// 		maintainAspectRatio: false, // Allow chart to adjust height and width independently
// 		plugins: {
// 			legend: {
// 				labels: {
// 					font: {
// 						size: 14, // Set default font size for labels
// 					},
// 				},
// 			},
// 			tooltip: {
// 				titleFont: { size: 16 }, // Set font size for tooltip title
// 				bodyFont: { size: 14 }, // Set font size for tooltip body
// 			},
// 		},
// 	};

// 	return (
// 		<div
// 			className="chart-container"
// 			style={{
// 				position: "relative",
// 				width: `800px`,
// 				height: `300px`,
// 			}}
// 		>
// 			<Line
// 				data={ChartData}
// 				options={{ ...options, ...responsiveOptions }}
// 			/>
// 		</div>
// 	);
// };

// export default BarChart;
