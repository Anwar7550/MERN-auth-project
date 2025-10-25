import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../util/util";
import { ToastContainer } from "react-toastify";
const Home = () => {
  const [loggedinUser, setLoggedinUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedinUser(localStorage.getItem("LoggedInUser"));
  }, []);
  const handleLogOut = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("LoggedInUser");
    handleSuccess("User Log out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const fetchProducts = async () => {
    try {
      const url = "https://mern-auth-project-ee6v.vercel.app/auth/product";
      const headers = {
        headers: { Authorization: localStorage.getItem("Token") },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      // console.log(result);
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section>
      <h2 style={{ textTransform: "capitalize" }}>Hi, {loggedinUser} </h2>
      <button
        style={{
          margin: "10px 0px",
          padding: "10px",
          width: "110px",
          backgroundColor: "#081f5c",
          color: "white",
          border: "none",
        }}
        onClick={handleLogOut}
      >
        Log Out
      </button>
      <div>
        {products &&
          products.map((item, index) => (
            <ul key={index}>
              <span>
                {item.name} : {item.price}
              </span>
            </ul>
          ))}
      </div>
      <ToastContainer />
    </section>
  );
};
export default Home;
