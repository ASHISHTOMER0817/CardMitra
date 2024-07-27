import productList from "@/interface/productList";

const UserOrdersListRow = ({
	orderId,
	orderedAt,
	product,
	index,
}: {
	// index: number,
	orderId: string;
	orderedAt: string;
	product: productList;
	index: number;
}) => {
	return (
		<>
			{/* <tr key={index} className="even:bg-gray-100 sm:text-[10px]">
				<td className="py-4 px-12 sm:px-0.5 sm:py-1 text-gray-500">
					{orderId}
				</td>

				<td className="py-4 px-12 sm:px-0.5 sm:py-1">
					{new Date(orderedAt).toDateString()}
				</td>
				<td className="py-4 px-12 sm:px-0.5 sm:py-1 text-primaryBgClr">
					{product.name}
				</td>
				<td className="py-4 px-12 sm:px-0.5 sm:py-1 font-semibold">
					{product.price}
				</td>
			</tr> */}

			<tr
				key={index}
				className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
			>
				<td className="py-4 px-6 text-gray-500 truncate sm:px-2 sm:py-1">{orderId}</td>

				<td className="py-4 px-6 font-semibold text-primaryBgClr">
					{new Date(orderedAt).toDateString()}
				</td>

				<td className="py-4 px-6 text-gray-500 ">
					{product.name}{" "}
				</td>
				<td className="py-4 px-6 text-gray-500">
					₹{product.price}
				</td>
				<td className="py-4 px-6 text-gray-500">
					₹{product.commission}
				</td>
			</tr>
		</>
	);
};

export default UserOrdersListRow;
