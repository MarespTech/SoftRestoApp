import React, { Fragment } from 'react'
import { Grid, Box } from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, PieChart, Pie, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip, Legend  } from 'recharts';
import Title from '../includes/Title';
import CustomPieChart from './CustomPieChart';

const TabPanel = (props) => {
    const { children, value, index, data, pieData, ...other } = props;
    const theme = useTheme();

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          
            <Fragment>
                <Box p={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            {
                                data 
                                ?
                                    (
                                        <>
                                            <Title>{props.children}</Title>
                                            
                                            <h4>Sales Chart</h4>
                                            <ResponsiveContainer width="95%" height={300}>
                                                <LineChart
                                                    data={data}
                                                    margin={{
                                                        top: 16,
                                                        right: 16,
                                                        bottom: 0,
                                                        left: 24,
                                                    }}
                                                    width={500}
                                                    height={400}
                                                >
                                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                                    <XAxis dataKey="time" stroke={theme.palette.text.secondary}/>
                                                    <YAxis stroke={theme.palette.text.secondary}>
                                                    <Label
                                                            angle={270}
                                                            position="left"
                                                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                                                        >
                                                            Sales ($)
                                                        </Label>
                                                    </YAxis>
                                                    <Line type="monotone" dataKey="amount" stroke={theme.palette.info.main} />
                                                    <Tooltip />
                                                </LineChart>
                                            </ResponsiveContainer>  
                                            
                                            <h4>Orders Chart</h4>
                                            <ResponsiveContainer width="95%" height={300}>
                                                <LineChart
                                                    data={data}
                                                    margin={{
                                                        top: 16,
                                                        right: 16,
                                                        bottom: 0,
                                                        left: 24,
                                                    }}
                                                    width={500}
                                                    height={400}
                                                >
                                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                                    <XAxis dataKey="time" stroke={theme.palette.text.secondary}/>
                                                    <YAxis stroke={theme.palette.text.secondary}>
                                                        <Label
                                                            angle={270}
                                                            position="left"
                                                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                                                        >
                                                            # Orders
                                                        </Label>
                                                    </YAxis>
                                                    <Line type="monotone" dataKey="orders" stroke={theme.palette.info.main} />
                                                    <Tooltip />
                                                </LineChart>
                                            </ResponsiveContainer>  
                                             
                                            <h4>Orders By Category</h4>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <CustomPieChart data={pieData.chartCount}/>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )
                                :
                                    null
                            } 
                        </Grid>                        
                    </Grid>
                </Box>
            </Fragment>
          
          
          
        )}
      </div>
    );
}
 
export default TabPanel;
