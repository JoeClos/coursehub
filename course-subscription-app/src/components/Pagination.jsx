import { Pagination, Stack } from "@mui/material";
import PropTypes from "prop-types";

const PaginationComponent = ({
  count,
  page,
  onChange,
  siblingCount = 1,
  boundaryCount = 1,
}) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        sx={{ color: "#E0F2FE" }}
        // color="secondary"
        shape="rounded"
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
      />
    </Stack>
  );
};

PaginationComponent.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  siblingCount: PropTypes.number,
  boundaryCount: PropTypes.number,
};

export default PaginationComponent;
