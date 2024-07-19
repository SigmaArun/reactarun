import { useContext, useState } from "react";
import classes from "./UserForm.module.css";
import VoteContext from "../store/VoteContext";

const UserForm = () => {
  const voteCtx = useContext(VoteContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const item = {
      title,
      category,
    };

    voteCtx.addItem(item);
    setTitle("");
    setCategory("");
  };

  const closeFormHandler = () => {
    voteCtx.closeForm();
  };

  return (
    <div>
      <div className={classes.form}>
        <form onSubmit={submitHandler}>
          <label>Student Name:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={titleHandler}
            required
          ></input>
          <div>
            <label htmlFor="category">Choose a Monitor:</label>
            <select name="categories" value={category} onChange={categoryHandler} required>
              <option value="">Select a category</option>
              <option value="Mark">Mark</option>
              <option value="Elon">Elon</option>
              <option value="Arun Chaudhary">Arun Chaudhary</option>
            </select>
          </div>
          <button type="submit" style={{background:"green"}}>Vote</button>
          <button type="button" onClick={closeFormHandler}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
