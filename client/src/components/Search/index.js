import React from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

const SearchBar = (props) => {
  const handleInputChange = (e) => {
    props.setSearch(e.target.value);
  };

  return (
    <Form>
      <FormControl
        placeholder="Search"
        onChange={handleInputChange}
      ></FormControl>
    </Form>
  );
};
export default SearchBar;
