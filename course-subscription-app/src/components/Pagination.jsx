import { Pagination, Stack } from "@mui/material";

const PaginationComponent = ({ count, page, onChange, siblingCount = 1, boundaryCount = 1 }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color="secondary"
        shape="rounded"
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
      />
    </Stack>
  );
};

export default PaginationComponent;
