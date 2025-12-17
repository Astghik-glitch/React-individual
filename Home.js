import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "./WishlistContext";



export default function Home() {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [error, setError] = useState("");


  const navigate = useNavigate();
  const { dispatch } = useContext(WishlistContext);


  const submitHandler = (e) => {
    e.preventDefault();


    if (title.trim() === "") {
      setError("Title is required");
      return;
    }


    const id = Date.now().toString();


    const data = {
      wishlist: { title, owner },
      items: []
    };


    localStorage.setItem(id, JSON.stringify(data));
    dispatch({ type: "SET_DATA", payload: data });
    navigate(`/wishlist/${id}`);
  };


  return (
    <div>
      <h1>Create Wishlist</h1>


      <form onSubmit={submitHandler}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Wishlist title"
        />


        <input
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="Owner name"
        />


        {error && <p style={{ color: "red" }}>{error}</p>}
        <button>Create</button>
      </form>
    </div>
  );
}
