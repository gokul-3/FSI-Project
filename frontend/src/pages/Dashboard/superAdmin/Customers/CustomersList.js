import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { superAdminActions } from "../../../../Store/superAdmin-slice";
import { useSelector, useDispatch } from "react-redux";
import SkeletonCard from "./SkeletonCard";
import Search from "./Search";
import ErrorPage from "./ErrorPage";
import ConfirmationDialog from "./ConfirmationDialog";
import CustomerCard from "./CustomerCard";
import EditDialog from "./EditDialog";
import axios from "../../../../axios";
import { FormModal } from "../../../../components/addUserForm/addUserForm";
import ErrorPageTemplate from "../../../../Layouts/ErrorPages/ErrorPageTemplate";
import { HttpStatusCode } from "axios";
import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ShowInfoModal from "../../../../Layouts/Modal/Modal";
export default function Customers() {
  const pageLimit = 8;
  const { setCustomersData, setCustomerEditedImg, setCustomerEditedName } =
    superAdminActions;
  const dispatch = useDispatch();
  const { totalRecords, data: customers } = useSelector(
    (state) => state.superAdmin.Customers.data
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalInfo, setModalInfo] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const editedName = useSelector(
    (state) => state.superAdmin.Customers.editedName
  );
  const editedImg = useSelector(
    (state) => state.superAdmin.Customers.editedImg
  );
  const [queryParams, setQueryParams] = useState({
    page: 1,
    search: "",
    sort: "created_at-desc",
  });
  const updateQueryParam = (paramName, paramValue) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      [paramName]: paramValue,
    }));
  };
  const userRole = useSelector((state) => state.profile.userRole);
  const pageLength = Math.ceil(totalRecords / pageLimit);
  const [openForm, setOpenForm] = useState(false);
  const [sortValue, setSortValue] = useState("created_at-desc");
  const [addedUserRenderer, setAddedUserRenderer] = useState(false);
  const addUserHandler = () => {
    setAddedUserRenderer((prev) => !prev);
  };
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
  const navigate = useNavigate();
  const handleEditCustomer = async () => {
    const formData = new FormData();
    formData.append("name", editedName);

    if (editedImg) {
      formData.append("Image", editedImg);
    }
    try {
      const resp = await axios.put(
        `/customer/${customers[editIndex].id}`,
        formData,
        { headers }
      );
      setUpdated(!updated);
      setDialogOpen(false);
      dispatch(setCustomerEditedImg(null));
      setModalInfo({ title: "Success", content: resp.data.message });
    } catch (error) {
      handleError(error);
    }
  };

  const confirmDelete = async () => {
    try {
      const resp = await axios.delete(
        `/customer/${customers[deleteIndex].id}`,
        {
          headers,
        }
      );
      setDialogOpen(false);
      setDeleteIndex(null);
      console.log(resp);
      setModalInfo({ title: "Success", content: resp.data.message });
      if (totalRecords % 2 != 0) {
        updateQueryParam("page", queryParams.page - 1);
      } else {
        setUpdated(!updated);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const fetchData = async () => {
    try {
      const reqUrl =
        "/customer?" +
        (queryParams.page && `page=${queryParams.page}&`) +
        (queryParams.search && `search=${queryParams.search}&`) +
        (queryParams.sort && `sort=${queryParams.sort}`);

      const response = await axios.get(reqUrl, { headers });
      setIsLoading(false);
      dispatch(setCustomersData(response.data));
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    setModalInfo({ title: "Error", content: error.response.data.message });
  };

  const renderCustomerList = () => {
    return customers.map((d, index) => (
      <CustomerCard
        key={index}
        index={index}
        showDeleteConfirmation={(index) => {
          setDeleteIndex(index);
          setDialogOpen(true);
        }}
        showEdit={(index) => {
          setEditIndex(index);
          dispatch(setCustomerEditedName(customers[index].name));
          setDialogOpen(true);
        }}
      />
    ));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [queryParams, updated, addedUserRenderer]);
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
      <>
        <Button
          sx={{
            position: "relative",
            top: "2.5rem",
            left: "2.5rem",
          }}
          variant="contained"
          color="primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIos fontSize="12px" /> Back
        </Button>
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
            flexWrap="wrap-reverse"
            gap="2rem"
            justifyContent="center"
          >
            <Search
              onSearch={(searchVal) => {
                updateQueryParam("search", searchVal);
                updateQueryParam("page", 1);
              }}
            />
            <FormControl sx={{ minWidth: 130 }} size="small">
              <InputLabel id="demo-select-small-label">Sort by</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={queryParams.sort}
                label="Sort by"
                onChange={(e) => {
                  updateQueryParam("sort", e.target.value);
                }}
              >
                <MenuItem value="created_at-desc">Recent</MenuItem>
                <MenuItem value="created_at-asc">Earliest</MenuItem>
                <MenuItem value="name-asc">Name</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenForm(!openForm)}
            >
              Add Customer
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={3}>
            {isLoading ? (
              showSkeletonLoading(pageLimit)
            ) : totalRecords > 0 ? (
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
                      onChange={(event, page) => {
                        if (page != queryParams.page)
                          updateQueryParam("page", page);
                      }}
                      page={queryParams.page}
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
            open={dialogOpen}
            onClose={() => {
              setDialogOpen(false);
              setDeleteIndex(null);
            }}
            onConfirm={confirmDelete}
            message={`Are you sure you want to delete customer: ${customers[deleteIndex].name}?`}
          />
        )}
        {editIndex !== null && (
          <EditDialog
            open={dialogOpen}
            handleClose={() => {
              setDialogOpen(false);
              setEditIndex(null);
            }}
            handleEditCustomer={handleEditCustomer}
          />
        )}
        <ShowInfoModal
          title={!!modalInfo && modalInfo.title}
          content={!!modalInfo && modalInfo.content}
          openModal={!!modalInfo}
          onCloseModal={() => {
            setModalInfo(false);
          }}
        />
        <FormModal
          onAddUser={addUserHandler}
          openModal={openForm}
          setOpenModal={setOpenForm}
        />
      </>
    </Grid>
  );
}
