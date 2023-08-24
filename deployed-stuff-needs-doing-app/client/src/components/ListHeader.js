import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

function ListHeader({ listName, getData}) {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [showModal, setShowModal] = useState(false);
  
    const signOut = () => {
      console.log("sign out");
      removeCookie("Email");
      removeCookie("AuthToken");
      window.location.reload()
    }

    return (
      <div className="list-header">
        <h1>{listName}</h1>
        <div className="button-container">
          <button className="createnew" onClick={() => setShowModal(true)}>Add New Stressor</button>
          <button className="signout" onClick={signOut}>Sign Out</button>
        </div>
        {showModal && <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />}
      </div>
    );
  }
  
  export default ListHeader;