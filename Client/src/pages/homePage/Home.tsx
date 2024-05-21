import { useContext } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "../../context/userContext";
import { LoggedInContext } from "../../context/loggedInContext";


function Home() {

  const loggedIn = useContext(LoggedInContext);
  
  const userDetails = useContext(UserContext)
  
  return (
    <div className="flex flex-col items-center justify-center h-4/5">
      {loggedIn ? 
        <>
          <h1 className="text-4xl font-bold mb-6 text-white">hello {`${userDetails?.firstName} ${userDetails?.lastName}`}</h1>
          <h1 className="text-4xl font-bold mb-6 text-white">Welcome to WeatherZublis!</h1>
        </> 
        :
        <>
          <h2 className="text-lg mb-4 text-white">Are you <Link to={"/register"} className="text-blue-500 hover:underline">Registered?</Link></h2>
          <h2 className="text-lg text-white">If you do - <Link to={"/login"} className="text-blue-500 hover:underline">Login!</Link></h2>
        </>
      }
    </div>
  );
}

export default Home