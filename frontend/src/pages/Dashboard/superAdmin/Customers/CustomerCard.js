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
import dummyLogo from "../../../../assets/no_image.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";

export default function CustomerCard({
  index,
  showDeleteConfirmation,
  showEdit,
}) {
  const customers = useSelector((state) => state.superAdmin.Customers.data);
  const [imageUrl, setImageUrl] = useState(null);
  const maxDisplayLen = 20;
  const navigate = useNavigate();
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
    navigate(`/customers/${customerId}`);
  };
  return (
    <Card sx={{ margin: "20px", height: "265px", width: "300px" }}>
      <Tooltip title={customers.data[index].name}>
        <CardActionArea
          onClick={() => handleOpenUsers(customers.data[index].id)}
        >
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
        <CardActions sx={{ display: "flex", justifyContent: "end", px: 1 }}>
          <Button
            // variant="contained"
            size="small"
            onClick={() => showEdit(index)}
          >
            Edit
          </Button>
          <Button
            // variant="contained"
            sx={{ color: red[700] }}
            size="small"
            onClick={() => showDeleteConfirmation(index)}
          >
            Delete
          </Button>
        </CardActions>
      </Tooltip>
    </Card>
  );
}
