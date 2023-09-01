import * as React from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material';


export default function BasicCard(props) {
    const CustomerData = (props)=>{
        return(
            <Typography sx={{borderBottom:"1px solid grey"}}>
                  Name : {props.data}
            </Typography>
        );
    }
    return (
        <Card sx={{ minWidth: 250,maxWidth:500,borderRadius:"16px" }} variant="elevation" elevation={4}>
            <CardContent>
                <Typography>
                {props.title} Activity
                </Typography>
                <CustomerData data="Emman" />
                <CustomerData data="Vikram" />
                <CustomerData data="Alex" />
            </CardContent>
        </Card>
    );
}