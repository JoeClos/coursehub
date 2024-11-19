import { Modal, Box, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const NotificationModal = ({ open, message, type, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    if (message === "success") {
      navigate("/login");
    }
  };
  // Define styles for success and error types
  const styles = {
    success: {
      backgroundColor: "#d4edda",
      color: "#155724",
      // border: "2px solid #155724",
      padding: "16px",
    },
    error: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      // border: "2px solid #721c24",
      padding: "16px",
    },
  };

  // Default modal style
  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    borderRadius: "8px",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="notification-modal-title"
      aria-describedby="notification-modal-description"
    >
      <Box sx={{ ...boxStyle, ...styles[type] }}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: " 1rem",
            marginBottom: "1rem",
          }}
        >
          {type === "success" ? (
            <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
          ) : (
            <ErrorIcon color="error" sx={{ fontSize: 40 }} />
          )}
          <Typography id="notification-modal-title" variant="h6">
            {type === "success" ? "Success" : "Error"}
          </Typography>
        </Box>
        <Typography
          id="notification-modal-description"
          sx={{ mt: 1, textAlign: "center" }}
        >
          {message}
        </Typography>
        <Button
          onClick={handleClose}
          sx={{ mt: 2 }}
          variant="contained"
          color={type === "success" ? "success" : "error"}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

// PropTypes for validation
NotificationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationModal;
