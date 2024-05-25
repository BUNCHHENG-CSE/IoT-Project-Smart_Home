import { createContext, useEffect, useState } from "react";
import MainPage from "./page/MainPage";
import Login from "./page/Login";
import GuestPage from "./page/GuestPage";
function App() {
  const [token, setToken] = useState(false);
  const [guest,setGuest] = useState(false)
  useEffect(() => {
    !sessionStorage.getItem("Email") && !sessionStorage.getItem("Password")? setToken(false): setToken(true);
    !sessionStorage.getItem("Guest")? setGuest(false): setGuest(true);
  }, []);

  return (
    <>
      {token ? <MainPage setToken={setToken} /> : guest ? <GuestPage setGuest={setGuest} /> : <Login setToken={setToken} setGuest={setGuest}/>}
    </>
  );
}

export default App;
