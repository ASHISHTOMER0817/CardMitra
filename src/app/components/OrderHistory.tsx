import React, { useState } from 'react'
import CardLayout from './CardLayout';


interface orderHistory {
	order: {
		name: string;
		price: number;
		commission: number;
	};
	quantity: number;
}

const OrderHistory = ({data}:{data:orderHistory[]}) => {
      // const [data, setData] = useState<orderHistory[]>([]);

  return (
    <div>
      {data.map(({ quantity, order }, index) => (
					<div key={index}>
						<CardLayout
							quantity={quantity}
							name={order.name}
							randomNo={65456141161}
							price={order.price}
							commission={order.commission}
						/>
					</div>
				))}
    </div>
  )
}

export default OrderHistory;