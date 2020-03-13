import React from "react";
import PropTypes from "prop-types";

const Person = ({ person }) => (
  <tr>
    <th>{person.firstname}</th>
    <th>{person.lastname}</th>
    <th>{person.email}</th>
    <th>{person.phonenumber}</th>
    <th>
      {person.birthday_contact
        .split("-")
        .reverse()
        .join(".")}
    </th>
    <th>{person.company}</th>
    <th>{person.birthday_contact.substring(8, 10)}</th>
    <th>{person.birthday_contact.substring(5, 7)}</th>

  </tr>
);

Person.propTypes = { person: PropTypes.object.isRequired };

export default Person;
