import React, { useState, useEffect } from "react";
import { API_URL } from "./api";
import Person from "./Person";
import "./PeopleTable.css";

const PeopleTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSort] = useState("");

  const fetchUrl = async () => {
    const response = await fetch(API_URL);
    const json = await response.json();
    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  const refreshPage = () => {
    window.location.reload(false);
  };

  const sortTableBy = order => {
    if (sortType === order) {
      setData([...data].reverse());
    } else {
      switch (order) {
        case "sortByDay":
          setData(
            [...data].sort(
              (a, b) =>
                a.birthday_contact.substring(8, 10) -
                b.birthday_contact.substring(8, 10)
            )
          );
          break;
        case "sortByMonth":
          setData(
            [...data].sort(
              (a, b) =>
                +new Date(a.birthday_contact) - +new Date(b.birthday_contact)
            )
          );
          break;
        default:
      }
      setSort(order);
    }
  };

  return (
    <div>
      <h1>Person Table</h1>
      <button className="button" onClick={refreshPage}>
        Click to reload!
      </button>
      {loading ? (
        <p>"Loading..."</p>
      ) : (
        <table className="people_table">
          <thead className="table_header">
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>PhoneNumber</th>
              <th>DateOfBirth</th>
              <th>Company</th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => sortTableBy("sortByDay")}
              >
                DayOfBirth
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => sortTableBy("sortByMonth")}
              >
                MonthOFBirth
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((person, i) => (
              <Person person={person} key={i} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PeopleTable;
