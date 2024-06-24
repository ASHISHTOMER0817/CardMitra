import productList from "@/interface/productList";

const UserOrdersListRow = ({
	orderId,
	deliveryDate,
	orderedAt,
	product,
}: {
	// index: number,
	orderId: string;
	deliveryDate: string;
	orderedAt: string;
	product: productList;
}) => {
	return (
		<tr className="even:bg-gray-100 sm:text-[10px]">
			<td className="py-4 px-12 sm:px-0.5 sm:py-1 text-gray-500">
				{orderId}
			</td>
			<td className="py-4 px-12 sm:px-0.5 sm:py-1">
				{deliveryDate}
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
		</tr>
	);
};

export default UserOrdersListRow;
