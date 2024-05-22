import { Line } from "react-chartjs-2";
import React from "react";
import { Chart as ChartJS } from "chart.js/auto";

ChartJS.defaults.font.size = 12; // Set the default font size

const LineChart = ({ ChartData }) => {
	const options = {
		maintainAspectRatio: false,
		legend: {
			labels: {
				font: {
					size: 12, // Set the font size for legend labels
				},
			},
		},
		scales: {
			x: {
				ticks: {
					font: {
						size: 12, // Set the font size for x-axis labels
					},
				},
			},
			y: {
				ticks: {
					font: {
						size: 12, // Set the font size for y-axis labels
					},
				},
			},
		},
	};

	const chartStyle = {
		"@media (max-width: 639px)": {
			canvas: {
				fontSize: "10px !important",
			},
		},
	};

	return <Line data={ChartData} options={options} style={chartStyle} />;
};

export default LineChart;

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
