import React, { useState } from "react";

// import { BrowserRouter as Router, Route } from 'react-router-dom';

import SignIn from "./components/SignIn/SignIn";
import ChatRoom from "./components/ChatRoom/ChatRoom";
// import SignUp from './components/SignUp/SignUp';
import SignUp from "./components/SignUp/SignUp";

import "./App.css";

const App = () => {
   const [view, setView] = useState("SignIn");
   const [tempUser, setTempUser] = useState({});
   const activeUsers = [];
   const dbUrl = "https://shrouded-depths-17947.herokuapp.com/";

   const addUser = (user, userId) => {
      const alreadyLoggedIn = activeUsers.find(
         user => user.user._id === userId
      );

      if (alreadyLoggedIn) {
         return { error: "Already logged in" };
      }

      activeUsers.push(user);
      console.log(activeUsers);
   };

   const renderView = currView => {
      switch (currView) {
         case "SignIn":
            return (
               <SignIn
                  setView={setView}
                  setTempUser={setTempUser}
                  addUser={addUser}
                  dbUrl={dbUrl}
               />
            );
            break;
         case "NewUser":
            return (
               <SignUp
                  setView={setView}
                  setTempUser={setTempUser}
                  dbUrl={dbUrl}
               />
            );
            break;
         case "ChatRoom":
            return (
               <ChatRoom
                  tempUser={tempUser}
                  setTempUser={setTempUser}
                  dbUrl={dbUrl}
               />
            );
            break;
      }
   };

   return <div className="appDiv">{renderView(view)}</div>;
};

export default App;
