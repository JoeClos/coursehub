import { useState } from "react";
import { InputBase, Box, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import PropTypes from 'prop-types'; 

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);  
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "rgba(255, 255, 255, 0.15)", borderRadius: "4px", padding: "0 8px", marginRight: "15px" }}>
      <InputBase
        sx={{ color: "white", paddingLeft: "8px", maxWidth: "600px", width: "100%", margin: "0 auto"}}
        placeholder="Search Courses"
        value={query}
        onChange={handleSearchChange}
        
      />
      <IconButton type="button" sx={{ padding: "10px" }} onClick={() => onSearch(query)}>
        <SearchIcon sx={{ color: "white" }} />
      </IconButton>
    </Box>
  );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

export default SearchBar;
