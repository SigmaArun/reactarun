import React, { useContext } from "react";
import AddNewVote from "./classMonitorVoteProject/components/AddNewVote";
import VoteProvider from "./classMonitorVoteProject/store/VoteProvider";
import "./App.css";

import VoteContext from "./classMonitorVoteProject/store/VoteContext";
import Candidates from "./classMonitorVoteProject/components/Candidates";

const App = () => {
  const useVote = useContext(VoteContext);

  console.log("Total passwords in App:", useVote.totalQuantity);
  return (
    <div>
      <div >
       
        <VoteProvider>
          <div className="app">
          <h2>Class Monitor Vote System</h2>
         <AddNewVote></AddNewVote>
          </div>
           <Candidates></Candidates>
        </VoteProvider>
      </div>
    </div>
  );
};
export default App;
