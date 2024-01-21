import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BookTable() {
  const { books } = useSelector((state) => state.bookInfo);
  const [filteredBook, setFilteredBook] = useState([]);

  useEffect(() => {
    setFilteredBook(books);
  }, [books]);

  const handleOnSearch = (e) => {
    const { value } = e.target;
    const str = value.toLowerCase();

    const searchedBook = books.filter((item) =>
      item.name.toLowerCase().includes(str)
    );

    setFilteredBook(searchedBook);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center gap-5 mb-3">
        {/* search form */}
        <Form.Control
          className="rounded shadow-lg p-2 w-100"
          type="text"
          name=""
          placeholder="search book/s by name..."
          onChange={handleOnSearch}
        />

        {/* add new book button */}
        <Link to="/new-book" className="w-100 text-end">
          <Button className="p-2" variant="success">
            Add new book
          </Button>
        </Link>
      </div>

      {/* no. of books displaying message */}
      <label className="mb-3">
        {filteredBook.length === 0
          ? `Currently, our shelves are awaiting new arrivals. Please stay tuned for exciting additions !`
          : filteredBook?.length > 1
          ? filteredBook.length + ` books found !`
          : `1 book found !`}
      </label>

      {/* book table */}
      <div className="custom-table">
        <Table striped bordered hover variant="light" className="shadow-lg">
          <thead>
            <tr>
              <th>#</th>
              <th>Thumbnail</th>
              <th>Book Details</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBook.map(
              (
                {
                  _id,
                  status,
                  thumbnail,
                  name,
                  publishYear,
                  isbn,
                  author,
                  description,
                },
                i
              ) => (
                <tr key={_id}>
                  <td>{i + 1}</td>

                  <td>
                    <img src={thumbnail} alt="book image" width={100} />
                  </td>
                  <td>
                    Name: {name}
                    <br />
                    Author: {author}
                    <br />
                    Published year: {publishYear}
                    <br />
                    ISBN: {isbn}
                    <br />
                    Status:{" "}
                    <span
                      className="p-1 rounded"
                      style={{
                        background: status === "inactive" ? "red" : "green",
                      }}
                    >
                      {status}
                    </span>
                  </td>
                  <td>{description.slice(0, 100)}...</td>
                  <td>
                    <Link to={`/edit-book/${_id}`}>
                      <Button variant="warning">Edit</Button>
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default BookTable;
