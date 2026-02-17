import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    toast.success("User Log out successfully");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const fetchProducts = async () => {
    try {
      const url = "https://mern-auth-project-backend.vercel.app/auth/product";
      const headers = {
        headers: { Authorization: localStorage.getItem("Token") },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      toast.error(error);
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
    </section>
  );
};
export default Home;
