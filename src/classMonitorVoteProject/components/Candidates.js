import React, { useContext } from "react";
import './Candidates.css';
import VoteContext from "../store/VoteContext";

const Candidates = () => {
  const voteCtx = useContext(VoteContext);

  const categories = ["Mark", "Elon", "Arun Chaudhary"];

  const votesByCategory = categories.map((category) => {
    const categoryVotes = voteCtx.items.filter(item => item.category === category);
    return {
      category,
      votes: categoryVotes,
      totalVotes: categoryVotes.length,
    };
  });

  const deleteVoteHandler = (id) => {
    voteCtx.removeItem(id);
  };

  return (
    <div className="container">
      <h2> Candidates </h2>
      {votesByCategory.map(({ category, votes, totalVotes }) => (
        <div key={category} className="category">
          <h3>{category}</h3>
          <span>Total: {totalVotes}</span>
          <ul>
            {votes.map((vote) => (
              <li key={vote._id}>
                {vote.title}
                <button onClick={() => deleteVoteHandler(vote._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Candidates;
