import BounceLoader from "react-spinners/BounceLoader";

export default function Loader({classList}:{classList?:string}) {
	return (
		<div className={`fixed inset-0 flex justify-center items-center ${classList}`}>
			<BounceLoader
				color="#36d7b7"
				  cssOverride={{}}
				loading
				size={20}
				speedMultiplier={2}
			/>
		</div>
	);
}
