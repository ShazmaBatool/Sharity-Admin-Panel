import React from "react";
import firebase from "firebase";
import { DotLoader } from "react-spinners";

function Logout(props) {
  const handleSignOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then((res) => {
        // SignOut();
        //remove the token
        props.history.replace("/login");
      })
      .catch((err) => {
        console.log("Index -> err", err.toString());
      });
  };
  React.useEffect(() => {
    handleSignOut();
  });
  return (
    <div className="loading">
      <DotLoader size={80} />
    </div>
  );
}

export default Logout;
