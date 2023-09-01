import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

export default function BasicCard() {
    const NumberBox = (props) => {
        return (<Box sx={{width:"50%", padding:"2.5%"}}>
            <Typography>
                {props.head}
            </Typography>
            <Typography variant='h4' sx={{ paddingTop: "12px" }} >
                {props.count}
            </Typography>
        </Box>);
    }
    return (
        <Card sx={{ minWidth: 175,maxWidth:350,borderRadius:"16px" }} variant="elevation" elevation={4} >
            <CardContent sx={{ textAlign: "center"}}>
                <Typography variant='h5' sx={{marginTop:'1rem'}}>
                    Customer Status
                </Typography>
                <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-evenly" }}>
                    <NumberBox head=" Total Customers " count="12" />
                    <NumberBox head=" Active Customers " count="4" />
                </CardContent>
            </CardContent>
        </Card>
    );
}