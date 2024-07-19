import React, { useContext } from "react";
import Modal from "../UI/Modal";
import UserForm from "./UserForm";
import VoteContext from "../store/VoteContext";
import "./AddNewVote.css";

const AddNewVote = () => {
  const voteCtx = useContext(VoteContext);

  const handler = () => {
    voteCtx.handleForm();
  };

  return (
    <div>
      <div>
        <span>
          Total Votes:{" "}
          <span style={{ fontWeight: "bold" }}>
            {voteCtx.totalQuantity}
          </span>
        </span>
      </div>
      <div className="passwordBt">
        <button onClick={handler} style={{background:"yellow"}}>Add New Vote</button>
      </div>
      {voteCtx.showForm && (
        <Modal>
          <UserForm />
        </Modal>
      )}
    </div>
  );
};

export default AddNewVote;
