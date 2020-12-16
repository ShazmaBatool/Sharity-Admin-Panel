import React, { useState, useEffect } from "react";
import { DotLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [orgData, setOrgData] = useState([]);
  const [donorData, setDonorData] = useState([]);
  const [deleteOrg, setDeleteOrg] = useState("");
  const database = firebase.database();

  useEffect(() => {
    gettingOrgData();
    // gettingDonorData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const gettingOrgData = () => {
    database
      .ref("/Users/Organization")
      .once("value")
      .then(function (snapshot) {
        var result = Object.values(snapshot.val());
        setOrgData(result);
      });
  };
  const gettingDonorData = () => {
    database
      .ref("/Users/Donor")
      .once("value")
      .then(function (snapshot) {
        var result = Object.values(snapshot.val());
        setDonorData(result);
      });
  };
  const handleDelete = (email) => {
    database
      .ref("/Users/Organization/")
      .once("value")
      .then(function (snapshot) {
        var status = "";
        var uid = "";
        snapshot.forEach((el) => {
          if (el.val().OrgEmail === email) {
            status = el.key;
            uid = el.val().uid;
          }
        });
        database.ref("Users/Organization/" + status).remove();
      });
    gettingOrgData();
  };
  return (
    <>
      {loading ? (
        <div className='loading'>
          <DotLoader size={80} color='#bb2265' />
        </div>
      ) : (
        <>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='mt-2 mb-4'>Organization's Dataset</h4>
              <div className='table-responsive'>
                <table
                  id='myTable'
                  className='table table-bordred table-striped'>
                  <thead>
                    <tr>
                      <th>
                        <input type='checkbox' id='checkall' />
                      </th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orgData &&
                      orgData.map((row) => (
                        <tr key={row}>
                          <td>
                            <input type='checkbox' className='checkthis' />
                          </td>
                          <td>{row.OrgName}</td>
                          <td>{row.OrgAddress}</td>
                          <td>{row.OrgCity}</td>
                          <td>{row.OrgEmail}</td>
                          <td>{row.OrgPassword}</td>

                          <td>
                            <Link
                              to={{ pathname: "/update-org", params: row }}
                              className='btn btn-primary btn-xs'
                              data-title='Edit'
                              data-toggle='modal'
                              data-target='#edit'>
                              <FontAwesomeIcon
                                icon={faPenSquare}
                                style={{ fontSize: 20 }}
                              />
                            </Link>
                          </td>
                          <td>
                            <button
                              onClick={() => handleDelete(row.OrgEmail)}
                              className='btn btn-danger btn-xs'
                              data-title='Remove'
                              data-toggle='modal'
                              data-target='#remove'>
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <div className='row'>
            <div className='col-md-12'>
              <h4 className='mt-2 mb-4'>Donor's Dataset</h4>
              <div className='table-responsive'>
                <table
                  id='myTable'
                  className='table table-bordred table-striped'>
                  <thead>
                    <tr>
                      <th>
                        <input type='checkbox' id='checkall' />
                      </th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Gender</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donorData &&
                      donorData.map((row) => (
                        <tr>
                          <td>
                            <input type='checkbox' className='checkthis' />
                          </td>
                          <td>{row.DonorName}</td>
                          <td>{row.DonorAddress}</td>
                          <td>{row.DonorCity}</td>
                          <td>{row.Email}</td>
                          <td>{row.PhoneNumber}</td>
                          <td>{row.Gender}</td>

                          <td>
                            <button
                              className='btn btn-danger btn-xs'
                              data-title='Remove'
                              data-toggle='modal'
                              data-target='#remove'>
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}
        </>
      )}
    </>
  );
}
