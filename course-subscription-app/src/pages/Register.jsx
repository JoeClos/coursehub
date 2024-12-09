import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationModal from "../components/NotificationModal";
import PasswordInput from "../components/PasswordInput";
import { registerUser } from "../utils/api";

import { Button, TextField, Container, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Register = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("error");
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);

      // Check if the response status is 201 (Created)
      if (response.status === 201) {
        setMessage("Registration successful!");
        setModalType("success");
        setModalOpen(true);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      } else {
        setMessage("Registration failed. Please try again.");
        setModalType("error");
        setModalOpen(true);
      }
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response ? error.response.data : error.message
      );

      // Handle error message
      setMessage(error.response?.data?.message || "Registration failed.");
      setModalType("error");
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    if (modalType === "success") {
      navigate("/login");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            fontSize: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
          }}
        >
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                label="First Name"
                name="firstName"
                sx={{backgroundColor: "white"}}
                fullWidth
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Last Name"
                name="lastName"
                sx={{backgroundColor: "white"}}
                fullWidth
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                sx={{backgroundColor: "white"}}
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <PasswordInput
                label="Password"
                name="password"
                sx={{backgroundColor: "white"}}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Grid>
            <Grid size={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{backgroundColor: "#757AD5"}}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <NotificationModal
        open={modalOpen}
        message={message}
        type={modalType}
        onClose={closeModal}
      />
    </Container>
  );
};

export default Register;
