"use client";
import Popup from "@/app/components/Popup";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const ReviewForm = () => {
	const [review, setReview] = useState("");
	const router = useRouter();

	const handleCancel = () => {
		setReview("");
		router.back()
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const response = await axios.post("/api/users/reviewForm", {
				review,
			});
			// console.log(response.data.success);
			if (response.data.success) {
				Popup("success", "Thank You for sharing!!");
				router.push("/userProfile");
			}
			console.log("Review submitted:", review);
		} catch {
			Popup("error", "Failed to submit review");
		}
		setReview("");
		// Reset the form
	};

	return (
		<div className="p-6 bg-white rounded-[20px] shadow-lg mx-auto review-width no-shadow-small sm:px-1">
			<h2 className="text-2xl font-bold text-green-600 mb-4">
				Submit Your Review
			</h2>
			<p className="mb-4 text-gray-700">
				We would love to hear your thoughts about our platform.
				Please share what you liked and any suggestions you
				have.
			</p>
			<form onSubmit={handleSubmit}>
				<textarea
					className="w-full h-40 p-4 mb-4 border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-green-600"
					placeholder="Write your review here..."
					value={review}
					onChange={(e) => setReview(e.target.value)}
				/>
				<div className="flex justify-end space-x-4">
					<button
						type="button"
						className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
						onClick={handleCancel}
					>
						Cancel
					</button>
					<button
						type="submit"
						className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default ReviewForm;
