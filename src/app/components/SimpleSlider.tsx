import { ReviewInterface } from "@/interface/productList";
import React from "react";
import Slider from "react-slick";

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
		autoplay: true,
		autoplaySpeed: 2000,
		cssEase: "linear",
		initialSlide: 0,

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
	return (
		<div className="slider-container">
			<Slider {...settings}>
				{reviewArr.map(({ user, review }, index) => {
					return (
						<div
							key={index}
							className="p-6 flex flex-col h-72 justify-center items-center gap-8 rounded-2xl bg-white carousel-item sm:text-xs"
						>
							<div className="text-lg font-semibold">
								{user}
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
