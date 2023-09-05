import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import noData from "../../../../assets/nodataimg.jpg"
import somethingWentWrong from "../../../../assets/something-went-wrong.png"
function ErrorPage({error}) {
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
        <img
          src={error=="noData"?noData:somethingWentWrong}
          alt={error}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <Typography variant="h6" color="textSecondary">
         {error=="noData"?"No Customers Found":"Something Went Wrong Please try again later :)"}
        </Typography>
      </Paper>
    </Container>
  );
}

export default ErrorPage;
