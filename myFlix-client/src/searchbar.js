import React from "react";
import { Form } from "react-bootstrap";

export const SearchBar = ({ filter, setFilter }) => (
  <Form className="mb-3">
    <Form.Control
      type="text"
      placeholder="Search movies..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  </Form>
);
