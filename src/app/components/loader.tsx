import BounceLoader from "react-spinners/BounceLoader";
import PuffLoader from "react-spinners/PuffLoader"
export default function Loader({classList}:{classList?:string}) {
	return (
		<div className={`fixed inset-0 flex justify-center items-center ${classList}`}>
			<PuffLoader
				color="#36d7b7"
				  cssOverride={{}}
				loading
				size={30}
				speedMultiplier={2}
			/>
		</div>
	);
}
