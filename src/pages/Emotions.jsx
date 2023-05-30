import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import LoadingSpinner from '../components/loadingSpinner';

function Emotions(props) {
  const location = useLocation();
  const { tableNum, customer } = location.state;
  console.log("Location State");
  console.log(location.state);
	const [isLoading, setIsLoading] = useState(false);
  const [series, setSeries] = useState([{
    data: {}
  }]);
  const [options, _] = useState(
    {
      chart: {
        id: 'realtime',
        height: 350,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      // annotations: {
      //   xaxis: [{
      //     x: '06:12:50',//new Date('13 Apr 2023 06:13:20').getTime(),
      //     borderColor: '#00E396',
      //     label: {
      //       borderColor: '#00E396',
      //       style: {
      //         color: '#fff',
      //         background: '#00E396',
      //       },
      //       text: 'Support',
      //     }
      //   }],
      // },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Emotions of a Customer',
        align: 'left'
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime',
        range:60000
      },
      yaxis: {
        max: 2,
        min:-3
      },
      legend: {
        show: false
      },
    }
  )

  useEffect(() => {
    setIsLoading(true);
    const interval = setInterval(() => {
      fetch(`http://localhost:8000/emotion/${customer._id}/`)
        .then(response => response.json())
        .then(json => {
          const series = [{
            name: "Emotion Series",
            data: []
          }];
          for(const element of json) {
            series[0].data.push({
              x:element.timestamp,
              y:element.value
            });
          }
          console.log(series);
          setSeries(series);
          setIsLoading(false);
          // ApexCharts.exec('realtime', 'updateSeries', [{
          //   data: data
          // }]);
        })
        .catch(err => console.error(err));
    }, 5000);
  
    return () => clearInterval(interval);
  }, [customer]);

  return (
		<div>
			<a className="text-xl" href="/">
				⬅️
			</a>
			<h2 className="font-bold text-3xl pt-2">Table {tableNum}</h2>
      <h3 className='font-bold text-2xl pt-2'>Emotions {customer ? 'of '+customer.name : ''}</h3>
			{isLoading ? 
				<LoadingSpinner />
			 : 
        <Chart series={series} options={options} type="line" height={350} />
			}
		</div>
	);
}

export default Emotions;
