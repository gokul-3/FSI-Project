import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import dummyLogo from "../../../../assets/dummyuser.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function CustomerCard({
  index,
  showDeleteConfirmation,
  showEdit,
}) {
  const customers = useSelector((state) => state.superAdmin.Customers.data);
  const [imageUrl, setImageUrl] = useState(null);
  const maxDisplayLen = 20;
  const Navigate=useNavigate();
  useEffect(() => {
    if (customers.data[index].icon) {
      const blob = new Blob([new Uint8Array(customers.data[index].icon.data)], {
        type: "image/jpeg",
      });

      const url = URL.createObjectURL(blob);

      setImageUrl(url);
    }
  }, [customers.data[index].icon]);
  const handleOpenUsers = (customerId) => {
    console.log(customerId);
    // <Navigate to={`/${customerId}`} />
    Navigate(`${customerId}`)
  };
  return (
    <Tooltip title={customers.data[index].name}>
      <Card sx={{ margin: "12px", height: "280px", width: "300px" }}>
        <CardActionArea onClick={()=>handleOpenUsers(customers.data[index].id)}>
          <CardMedia
            component="img"
            height="140"
            image={imageUrl || dummyLogo}
            alt="logo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {customers.data[index].name.length > maxDisplayLen
                ? customers.data[index].name.substring(0, maxDisplayLen) + "..."
                : customers.data[index].name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => showEdit(index)}>
            Edit
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => showDeleteConfirmation(index)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Tooltip>
  );
}
