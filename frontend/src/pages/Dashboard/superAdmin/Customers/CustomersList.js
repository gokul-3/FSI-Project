import React, { useEffect, useState } from "react";
import { Button, Grid, Pagination, Typography } from "@mui/material";
import { superAdminActions } from "../../../../Store/superAdmin-slice";
import { useSelector, useDispatch } from "react-redux";
import SkeletonCard from "./SkeletonCard";
import Search from "./Search";
import ErrorPage from "./ErrorPage";
import ConfirmationDialog from "./ConfirmationDialog";
import CustomerCard from "./CustomerCard";
import EditDialog from "./EditDialog";
import { DeletedMsg } from "./DeletedMsg";
import axios from "../../../../axios";
import { FormModal } from "../../../../components/addUserForm/addUserForm";
import { Navigate } from "react-router-dom";
import ErrorPageTemplate from "../../../../Layouts/ErrorPages/ErrorPageTemplate";
import { HttpStatusCode } from "axios";
export default function Customers() {
  const pageLimit = 8;
  const { setCustomersData, setCustomerEditedImg, setCustomerEditedName } =
    superAdminActions;
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.superAdmin.Customers.data);

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const [isDeletedMsgOpen, setIsDeletedMsgOpen] = useState(false);
  const [Deleted, setDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const editedName = useSelector(
    (state) => state.superAdmin.Customers.editedName
  );
  const editedImg = useSelector(
    (state) => state.superAdmin.Customers.editedImg
  );
  const userRole = useSelector((state) => state.profile.userRole);
  const [iseditDialogOpen, setIsEditDialogOpen] = useState(false);
  const pageLength = Math.ceil(customers.totalRecords / pageLimit);
  const [createCustomer, setCreateCustomer] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const accessToken = localStorage.getItem("accesstoken");
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  const showSkeletonLoading = (count) => {
    const skeletons = [];
    for (let i = 0; i < count; i++) {
      skeletons.push(<SkeletonCard key={i} />);
    }
    return skeletons;
  };

  const handleEditCustomer = async () => {
    const formData = new FormData();
    formData.append("name", editedName);

    if (editedImg) {
      formData.append("Image", editedImg);
    }
    try {
      const updatedCustomer = await axios.put(
        `/customer/${customers.data[editIndex].id}`,
        formData,
        { headers }
      );
      const updatedDataArray = [...customers.data];
      updatedDataArray[editIndex] = {
        ...updatedDataArray[editIndex],
        name: updatedCustomer.data.data.name,
        icon: updatedCustomer.data.data.icon,
      };
      dispatch(setCustomersData({ ...customers, data: updatedDataArray }));
      setEditIndex(null);
      setIsEditDialogOpen(false);
      dispatch(setCustomerEditedImg(null));
    } catch (error) {
      handleError(error);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/customer/${customers.data[deleteIndex].id}`, {
        headers,
      });
      setIsDeletedMsgOpen(true);
      setDeleteIndex(null);
      setIsConfirmationDialogOpen(false);
      if (customers.totalRecords % 2 != 0) {
        setPage(page - 1);
      } else {
        setDeleted(!Deleted);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/customer?page=${page}&search=${searchQuery}`,
        { headers }
      );
      setIsLoading(false);
      dispatch(setCustomersData(response.data));
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response && error.response.status === 404) {
      setError("notFound");
    } else {
      setError("somethingWentWrong");
    }
  };

  const renderCustomerList = () => {
    return customers.data.map((d, index) => (
      <CustomerCard
        key={index}
        index={index}
        showDeleteConfirmation={(index) => {
          setDeleteIndex(index);
          setIsConfirmationDialogOpen(true);
        }}
        showEdit={(index) => {
          setEditIndex(index);
          dispatch(setCustomerEditedName(customers.data[index].name));
          setIsEditDialogOpen(true);
        }}
      />
    ));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [page, searchQuery, Deleted]);
  if (userRole != "superAdmin") {
    return (
      <ErrorPageTemplate
        header={"Unauthorised Error"}
        code={HttpStatusCode.Unauthorized}
      />
    );
  }

  return (
    <Grid container spacing={3} pb={5}>
      {error ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          height="100vh"
          display="flex"
        >
          <ErrorPage error={error} />
        </Grid>
      ) : (
        <>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              minHeight: "0vh",
              marginTop: "6rem",
              marginBottom: "3rem",
              textAlign: "center",
            }}
          >
            <Grid
              item
              width="100%"
              display="flex"
              gap="2rem"
              justifyContent="center"
            >
              <Search
                onSearch={(searchVal) => {
                  setSearchQuery(searchVal);
                  setPage(1);
                }}
              />
              <Button
                variant="contained"
                color="primary"
                // sx={{ position: "absolute", top: 80, right: 20 }}
                onClick={() => setOpenForm(!openForm)}
              >
                + Add Customer
              </Button>
            </Grid>
            {/* {searchQuery && <Grid item xs={3}>
              <Typography variant="h6" color="textSecondary">
                Search Results for `{searchQuery}`
              </Typography>
            </Grid>} */}
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={3}>
              {isLoading ? (
                showSkeletonLoading(pageLimit)
              ) : customers.totalRecords > 0 ? (
                <>
                  {renderCustomerList()}
                  <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item xs={3} style={{ marginTop: "20px" }}>
                      <Pagination
                        count={pageLength || 1}
                        color="primary"
                        size="large"
                        onChange={(event, page) => setPage(page)}
                        page={page}
                      />
                    </Grid>
                  </Grid>
                </>
              ) : (
                <ErrorPage error="noData" />
              )}
            </Grid>
          </Grid>
          {deleteIndex !== null && (
            <ConfirmationDialog
              open={isConfirmationDialogOpen}
              onClose={() => {
                setIsConfirmationDialogOpen(false);
                setDeleteIndex(null);
              }}
              onConfirm={confirmDelete}
              message={`Are you sure you want to delete customer: ${customers.data[deleteIndex].name}?`}
            />
          )}
          {editIndex !== null && (
            <EditDialog
              open={iseditDialogOpen}
              handleClose={() => {
                setIsEditDialogOpen(false);
                setEditIndex(null);
              }}
              handleEditCustomer={handleEditCustomer}
            />
          )}
          <DeletedMsg
            isDeletedMsgOpen={isDeletedMsgOpen}
            handleClose={(event, reason) => {
              if (reason === "clickaway") {
                return;
              }
              setIsDeletedMsgOpen(false);
            }}
          />
          <FormModal openModal={openForm} setOpenModal={setOpenForm} />
        </>
      )}
    </Grid>
  );
}
