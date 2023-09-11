import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Skeleton,
    Typography,
  } from "@mui/material";
  export default function SkeletonCard() {
    return (
      <Card sx={{ margin: "12px", height: "280px", width: "300px" }}>
        <CardActionArea>
          <Skeleton variant="rectangular" height={140} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <Skeleton variant="text" height={20} />
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Skeleton variant="text" height={36} width={80} />
          <Skeleton variant="text" height={36} width={80} />
        </CardActions>
      </Card>
    );
  }
  