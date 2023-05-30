import { useEffect, useState } from "react";
import Customer from "../components/customer";
import LoadingSpinner from "../components/loadingSpinner";
import { useLocation } from "react-router-dom";
import "../index.css";

const TableDetail = (props) => {
	const location = useLocation();
	const { table } = location.state;
	const [message, setMessage] = useState("");
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch(`http://localhost:8000/session/latest?table_id=${table._id}`)
			.then((response) => response.json().then((json) => ({status: response.status, data: json})))
			.then((json) => {
				if (json.status === 404) {
					setMessage("No session started for table yet.");
				} else {
                    console.log(json.data);
					setData(json.data);
				}
				setIsLoading(false);
			})
			.catch((err) => console.error(err));
	}, [table]);

	return (
		<div>
			<a className="text-xl" href="/">
				⬅️
			</a>
			<h2 className="font-bold text-3xl pt-2">Table {table.number}</h2>
			{message !== "" ? (
				<p>{message}</p>
			) : isLoading ? (
				<LoadingSpinner />
			) : (
				<>
					<h3 className="font-bold text-2xl pt-3">Customers</h3>
					{data ? data.customers.map((customer) => {
						return <Customer table={table} customer={customer} />;
					}): <></>}
				</>
			)}
		</div>
	);
};

export default TableDetail;
