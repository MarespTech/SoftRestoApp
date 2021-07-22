import React, { Fragment, useEffect } from 'react'
import { Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip  } from 'recharts';
import { Line  } from 'react-chartjs-2';

// This component is using React-chartjs-2

const useStyles = makeStyles( theme => ({
    title: {
        fontWeight: "bold"
    },
    chart: {
        maxWidth: "90%",
        maxHeight: "90%",
        margin: "0 5%"
    }
}));

const labels = [];
const amounts = [];

const DashboardChart = ({data}) => {
    const classes = useStyles();

    useEffect(() => {
        const separateData = () => {
            data.forEach( dat => {
                labels.push(dat.time);
                amounts.push(dat.amount);
            });
        }

        separateData();
    }, []);


    const dataChart = {
        labels: labels,
        datasets: [
          {
            label: 'Sales',
            data: amounts,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      };
      
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

    return ( 

        <Fragment>
            <Typography 
                component="h2" 
                variant="h6" 
                color="primary" 
                className={classes.title}
            >
                Today
            </Typography>
            <Line className={classes.chart} data={dataChart} options={options} />

        </Fragment>
     );
}
 
export default DashboardChart;