import { useEffect, useState } from "react";
import Table from "../components/table";
import '../index.css';
import LoadingSpinner from "../components/loadingSpinner";

const Tables = (props) => {
    const [tables, setTables] = useState([{
        "title":"asdfafd",
        "desc":"sadf"
    },
    {
        "title":"asdfafd",
        "desc":"asfe"
    }]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:8000/table/")
            .then(response => response.json())
            .then(json => {
                setTables(json)
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    return (
        <div>
            <h3 className="font-bold text-3xl">Tables</h3>
            {isLoading ? <LoadingSpinner /> :
                tables.map((table) => {
                    return <Table data={table} />;
                })
            }
        </div>
    )
}

export default Tables;