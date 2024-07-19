import React, { useState, useEffect } from "react";
import VoteContext from "./VoteContext";
import { fetchVotes, storeVote, deleteVote } from "../components/voteService";

const VoteProvider = (props) => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const initializeVotes = async () => {
      try {
        const data = await fetchVotes();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch votes:', error);
      }
    };

    initializeVotes();
  }, []);

  useEffect(() => {
    setTotalQuantity(items.length);
  }, [items]);

  const handleForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const addItemHandler = async (item) => {
    try {
      const savedVote = await storeVote(item);
      setItems((prevItems) => [...prevItems, savedVote]);
    } catch (error) {
      console.error('Failed to store vote:', error);
    }
  };

  const removeItemHandler = async (id) => {
    try {
      await deleteVote(id);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Failed to delete vote:', error);
    }
  };

  const voteContext = {
    items,
    showForm,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    totalQuantity,
    handleForm,
    closeForm,
  };

  return (
    <VoteContext.Provider value={voteContext}>
      {props.children}
    </VoteContext.Provider>
  );
};

export default VoteProvider;
