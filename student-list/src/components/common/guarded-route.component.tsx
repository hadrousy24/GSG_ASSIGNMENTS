import React, { useContext } from "react"
import { AuthContext } from "../../providers/authProvider"
import { Link } from "react-router-dom";
import { Role } from "../../types";

interface IProps {
  children: React.ReactNode;
  roles: Role[];
}

const Guarded = (props: IProps) => {
  const {user} = useContext(AuthContext);

  if (user === null) {
    return (
      <div>
        <h2>You must be logged in to see this screen</h2>
        <Link to='/login'>Login here!</Link>
      </div>
    );
  } else if (!props.roles.includes(user.role)) {
    return (
      <div>
        <h2>You do not have sufficient permissions to see this screen!</h2>
      </div>
    );
  }
  
  return props.children;
}

export default Guarded;