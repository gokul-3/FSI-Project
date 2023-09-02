import React from 'react';
import { Avatar, Card, CardContent, Divider, List,ListItem, ListItemText, ListItemAvatar, Typography } from '@mui/material';



export default function BasicCard(props) {
    const CustomerData = ({ customers }) => {
        return customers.map((element, index) =>
            <>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>

                    <ListItemText
                        primary={
                            <Typography
                                fontSize="14px"
                                sx={{ display: 'inline-block' }} >
                                {element}
                            </Typography>
                        }
                    />
                    <ListItemText
                        primary={
                            <Typography
                                fontSize="14px"
                                sx={{ display: 'inline-block',float:'right' }} >
                                {element.length}
                            </Typography>
                        }
                    />
                </ListItem>
                {index !== customers.length - 1 && <Divider variant="inset" />}
            </>
        )
    }

    const names = ['Emma', "Vika", 'Alexa'];
    return (
        <Card sx={{minWidth: 300, maxWidth: 450,margin:'1rem', borderRadius: "6px" }} variant="elevation" elevation={4}>
            <CardContent>
                <Typography variant='h5' sx={{ textAlign: "center", margin: '1rem 0' }}>
                    {props.title} Activity
                </Typography>
                <CustomerData customers={names} />
            </CardContent>
        </Card>
    );
}