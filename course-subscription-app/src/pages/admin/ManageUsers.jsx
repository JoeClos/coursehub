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
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { fetchUsers } from "../../utils/api";
import Pagination from "../../components/Pagination";
import ScrollToTopButton from "../../components/ScrollToTopButton"; // Import ScrollToTopButton

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Fetch users from API
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching users", err);
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const showPagination = users.length > 0 && totalPages > 1;

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

  const paginatedUsers = users.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom mt={8}>
        Total Users: {users.length}
      </Typography>

      {isMobile ? (
        // Mobile View - Cards
        <Box display="flex" flexDirection="column" gap={2} p={2}>
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  User
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Role
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user._id}>
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
          />
        </Box>
      )}

      {/* Add the ScrollToTopButton component */}
      <ScrollToTopButton />
    </Box>
  );
};

export default ManageUsers;
