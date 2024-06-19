import { ReviewInterface } from "@/interface/productList";
import React from "react";
import Slider from "react-slick";
import { HiUser } from "react-icons/hi";

function RemoveArrow() {
	return <div className="hidden"></div>;
}

export default function SimpleSlider({
	reviewArr,
}: {
	reviewArr: { user: string; review: string }[];
}) {
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		// autoplay: true,
		autoplaySpeed: 2000,
		cssEase: "linear",
		initialSlide: 0,
		prevArrow: <RemoveArrow />,
		nextArrow: <RemoveArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	const colorPalette = [
		"pink",
		"violet",
		"aquamarine",
		"antiquewhite",
		"bisque",
		"cadetblue",
	];

	return (
		<div className="slider-container">
			<Slider {...settings}>
				{reviewArr.map(({ user, review }, index) => {
					const randomColor =
						colorPalette[Math.floor(Math.random() * 6)];
					return (
						<div
							key={index}
							className="p-6 flex flex-col h-72 justify-center items-center gap-8 rounded-2xl bg-white carousel-item"
						>
							{" "}
							<div className="flex justify-center items-center mr-auto gap-5">
								<HiUser
									style={{
										color: randomColor,
									}}
									className="h-10 w-10"
								/>
								<div className="text-lg font-semibold text-gray-700">
									{user}
								</div>
							</div>
							<div className=" text-gray-700 text-wrap">
								{review}
							</div>
						</div>
					);
				})}
			</Slider>
		</div>
	);
}
