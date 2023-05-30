import {Link} from 'react-router-dom';
import '../index.css';

const Table = (props) => {
    return (
        <Link to="/tableDetail" state={{table: props.data}}>
            <div className="text-white font-bold inline-block p-5 m-2 w-40 h-40 text-center bg-gray-500">
                <p className='pt-10'>Table {props.data.number}</p>
            </div>
        </Link>
    )
}

export default Table;