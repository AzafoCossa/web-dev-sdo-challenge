import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import useAuth from "./hooks/useAuth";

function App() {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) return <p>Loading...</p>;
  if (!isAuthenticated) return <h1>User not authenticated</h1>;
  
    return (
      <>
        <div>
          <Navbar />
          <Outlet />
        </div>
      </>
    );
}

export default App;
