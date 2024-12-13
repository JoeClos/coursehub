import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from '@mui/icons-material/Check';

const AlertNotification = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  confirmText,
  cancelText,
  confirmColor = "",
  cancelColor = "",
  confirmStyle = {},
  cancelStyle = {},
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-around"}}>
        {cancelText && (
          <Button
            onClick={onClose}
            color={cancelColor}
            variant="contained"
            startIcon={<CancelIcon />}
            style={cancelStyle}
          >
            {cancelText}
          </Button>
        )}
        {confirmText && (
          <Button
            onClick={onConfirm}
            color={confirmColor}
            variant="contained"
            startIcon={<CheckIcon />}
            style={confirmStyle}
          >
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

AlertNotification.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  confirmColor: PropTypes.string,
  cancelColor: PropTypes.string,
  confirmStyle: PropTypes.object,
  cancelStyle: PropTypes.object,
};

export default AlertNotification;
