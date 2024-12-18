import { useEffect, useContext, Fragment, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableSortLabel,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../../../store/CartContext";
import AuthContext from "../../../store/AuthContext";
import "./manageSubscriptions.css";
import Pagination from "../../../components/Pagination";

const ManageSubscriptions = () => {
  const {
    subscriptions,
    getAllSubscriptions,
    getSubscriptionsForLearner,
    deleteSubscription,
  } = useCart();
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(3);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("learnerId.firstName");

  // Group subscriptions by learner globally
  const globalGroupedSubscriptions = subscriptions.reduce((acc, sub) => {
    const learnerKey = `${sub.learnerId?.firstName} ${sub.learnerId?.lastName}`;
    if (!acc[learnerKey]) {
      acc[learnerKey] = [];
    }
    acc[learnerKey].push(sub);
    return acc;
  }, {});

  // Get all learner keys (names)
  const learnerKeys = Object.keys(globalGroupedSubscriptions);

  // Sort the learner keys based on the orderBy and order state
  const sortedLearnerKeys = learnerKeys.sort((a, b) => {
    const valueA = a.split(" ")[0]; // First name as a simple example
    const valueB = b.split(" ")[0];
    if (orderBy === "learnerId.firstName") {
      if (order === "desc") return valueB.localeCompare(valueA);
      return valueA.localeCompare(valueB);
    }
    return 0;
  });

  // Paginate grouped learners
  const totalPages = Math.ceil(sortedLearnerKeys.length / rowsPerPage);
  const paginatedLearnerKeys = sortedLearnerKeys.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const showPagination = learnerKeys.length > 0 && totalPages > 1;

  // Handle sorting
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (user?.role === "admin") {
      getAllSubscriptions(); // No learnerId needed for admin
    } else {
      const learnerId = localStorage.getItem("learnerId");
      if (learnerId) {
        getSubscriptionsForLearner(learnerId); // Pass learnerId for non-admin
      }
    }
  }, [user, getSubscriptionsForLearner, getAllSubscriptions]);

  // Handle subscription cancellation (deletion)
  const handleDeleteSubscription = (subscriptionId) => {
    deleteSubscription(subscriptionId);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom mt={6} sx={{ padding: "0 16px" }}>
        Total Subscriptions: {subscriptions.length}
      </Typography>

      <Box sx={{ overflowX: "auto" }}>
        <TableContainer component={Paper} className="table-style">
          <Table aria-label="subscriptions table">
            <TableHead sx={{ backgroundColor: "#201F40" }}>
              <TableRow>
                <TableCell className="table-cell-style">#</TableCell>
                <TableCell className="table-cell-style-sort">
                  <TableSortLabel
                    className="table-cell-style-sort"
                    active={orderBy === "learnerId.firstName"}
                    direction={orderBy === "learnerId.firstName" ? order : "asc"}
                    onClick={() => handleRequestSort("learnerId.firstName")}
                  >
                    Subscriber
                  </TableSortLabel>
                </TableCell>
                <TableCell className="table-cell-style">Course</TableCell>
                <TableCell className="table-cell-style">
                  Subscription Date
                </TableCell>
                <TableCell className="table-cell-style" />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedLearnerKeys.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                    className="table-cell-style-sort"
                  >
                    No subscriptions found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLearnerKeys.map((learnerKey, learnerIndex) => (
                  <Fragment key={learnerKey}>
                    {globalGroupedSubscriptions[learnerKey].map(
                      (sub, subIndex) => (
                        <TableRow key={sub._id}>
                          {subIndex === 0 && (
                            <TableCell
                              rowSpan={globalGroupedSubscriptions[learnerKey].length}
                            >
                              {/* Global learner index */}
                              {(page - 1) * rowsPerPage + learnerIndex + 1}
                            </TableCell>
                          )}
                          {subIndex === 0 && (
                            <TableCell
                              rowSpan={globalGroupedSubscriptions[learnerKey].length}
                            >
                              {learnerKey}
                            </TableCell>
                          )}
                          <TableCell>{sub.courseId?.title}</TableCell>
                          <TableCell>
                            {new Date(sub.createdAt).toLocaleDateString("de-DE")}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              variant="contained"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleDeleteSubscription(sub._id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Pagination */}
      {showPagination && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            sx={{ backgroundColor: "#757AD5" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ManageSubscriptions;
