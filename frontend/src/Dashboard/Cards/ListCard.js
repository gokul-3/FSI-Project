import React from 'react';
import {Card, CardContent,Divider,ListItem,ListItemText, Typography } from "@mui/material";

export default function(){
    const UserData = ({ users }) => {
        return users.map((element, index) =>
            <>
                <ListItem alignItems="center">
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
                                {element.length} days ago
                            </Typography>
                            
                        }
                    />
                </ListItem>
                {index !== users.length - 1 && <Divider variant="" />}
            </>
        )
    }
    const names = ['Emma','Vik','Alexa','San','Goku','Sow','Thai','Go'];
    return(
        <Card sx={{minWidth: 240, maxWidth: 360,margin:'1rem', borderRadius: "6px" }} variant="elevation" elevation={4}>
            <CardContent>
                <Typography variant='h5' sx={{ textAlign: "center", margin: '1rem 0' }}>
                   New Users 
                </Typography>
                <Typography variant='body2' sx={{ textAlign: "center", margin: '1rem 0' }}>
                   (Created within last 30 days)
                </Typography>
                <UserData users={names}/>
            </CardContent>
        </Card>
    )
    
}