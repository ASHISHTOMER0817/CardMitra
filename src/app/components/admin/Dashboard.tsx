// import Datavisual from '@/app/datavisual/page'
import React from 'react'

const Dashboard = () => {
      
  return (
    <div>
<h3 className="my-7 font-semibold">Dashboard</h3>
			<div>
				<div className="px-3 py-4">
					Orders placed <br /> today
				</div>
				<div className="px-3 py-4">Total Order placed</div>
				<div className="px-3 py-4">Sold out </div>
				<div className="px-3 py-4">Affiliates Joined</div>
			</div>
                  {/* <Datavisual/> */}
                  <h3 className="my-5 font-semibold">Order History</h3>
    </div>
  )
}

export default Dashboard