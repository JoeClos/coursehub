import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableSortLabel,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
// import { fetchUsers } from "../../../utils/api";
import { useUsers } from "../../../store/UserContext";
import Pagination from "../../../components/Pagination";
import ScrollToTopButton from "../../../components/ScrollToTopButton"; // Import ScrollToTopButton
import "./manageUsers.css";

const ManageUsers = () => {
  // const [users, setUsers] = useState([]);
  const { users, getUsers } = useUsers();
  // console.log("🚀 ~ ManageUsers ~ users:", users);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("firstName");

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Fetch users from API
  useEffect(() => {
    try {
      getUsers();
      setLoading(false);
    } catch (error) {
      setError("Error fetching users", error);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const showPagination = users.length > 0 && totalPages > 1;

  //Sort user alphabetically
  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;

    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const sortedUsers = [...users].sort(getComparator(order, orderBy));

  const paginatedUsers = sortedUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom mt={6} sx={{ padding: "0 16px" }}>
        Total Users: {users.length}
      </Typography>

      {isMobile ? (
        // Mobile View - Cards
        <Box display="flex" flexDirection="column" gap={2}>
          {users.map((user) => (
            <Card key={user._id} variant="outlined">
              <CardContent>
                <Typography variant="h6">
                  {user.firstName} {user.lastName}
                </Typography>
                <Divider />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: "15px" }}
                  sortingUsers
                >
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Role: {user.role}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        // Desktop View - Table
        <TableContainer component={Paper} className="table-style">
          <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
            <TableHead sx={{ backgroundColor: "#201F40" }}>
              <TableRow>
                <TableCell className="table-cell-style">#</TableCell>
                <TableCell className="table-cell-style-sort">
                  <TableSortLabel
                    className="table-cell-style-sort"
                    active={orderBy === "firstName"}
                    direction={orderBy === "firstName" ? order : "asc"}
                    onClick={() => handleRequestSort("firstName")}
                  >
                    User
                  </TableSortLabel>
                </TableCell>
                <TableCell className="table-cell-style">Email</TableCell>
                <TableCell className="table-cell-style">Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {showPagination && !isMobile && (
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

      {/* Add the ScrollToTopButton component */}
      <ScrollToTopButton />
    </Box>
  );
};

export default ManageUsers;
