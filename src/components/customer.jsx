import { Link } from "react-router-dom";
import "../index.css";
import blank from "../img/blank.png";

const Customer = (props) => {
	return (
		<Link to="/emotions" state={{tableNum:props.table.number, customer: props.customer }}>
			<div className="inline-block w-40 h-40 bg-gray-500 m-4 p-4 text-center">
				<img
					src={props.customer.image ? props.customer.image : blank}
					alt={props.customer.name.slice(0, 10)}
					className="w-10/12 h-5/6 m-auto"
				></img>
				<h3 className="text-white font-bold pt-2">
					{props.customer.name ? props.customer.name.slice(0, 10) : "Unknown"}
				</h3>
			</div>
		</Link>
	);
};

export default Customer;
