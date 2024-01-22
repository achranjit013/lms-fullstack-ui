import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";

function StudentTable() {
  const { students } = useSelector((state) => state.studentInfo);
  const [filteredStudent, setFilteredStudent] = useState([]);

  useEffect(() => {
    setFilteredStudent(students);
  }, [students]);

  const handleOnSearch = (e) => {
    const { value } = e.target;
    const str = value.toLowerCase();

    const searchedStudent = students.filter(
      (item) =>
        item.fname.toLowerCase().includes(str) ||
        item.lname.toLowerCase().includes(str)
    );

    setFilteredStudent(searchedStudent);
  };

  return (
    <>
      <div className="mb-3">
        {/* search form */}
        <Form.Control
          className="rounded shadow-lg p-2 w-100"
          type="text"
          name=""
          placeholder="search student/s by name..."
          onChange={handleOnSearch}
        />
      </div>

      {/* no. of students displaying message */}
      <label className="mb-3">
        {filteredStudent.length === 0
          ? `Currently, our shelves are awaiting new arrivals. Please stay tuned for exciting additions !`
          : filteredStudent?.length > 1
          ? filteredStudent.length + ` students found !`
          : `1 student found !`}
      </label>

      {/* student table */}
      <div className="custom-table">
        <Table striped bordered hover variant="light" className="shadow-lg">
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Student Name</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudent.map(
              (
                { _id, status, fname, lname, address, phone, email, createdAt },
                i
              ) => (
                <tr key={_id}>
                  <td>{i + 1}</td>

                  <td>
                    Status: {status} <br /> Member since:{" "}
                    {createdAt.slice(0, 10)}
                  </td>
                  <td>Name: {fname + " " + lname}</td>
                  <td>
                    Address: {address} <br /> Phone: {phone} <br /> Email:{" "}
                    {email}
                  </td>
                  <td>
                    {/* <Link to={`/edit-student/${_id}`}>
                      <Button variant="warning">Edit</Button>
                    </Link> */}
                    Edit
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

export default StudentTable;
