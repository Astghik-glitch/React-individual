import { useEffect, useState, useContext } from "react";
import { WishlistContext } from "./WishlistContext";
import { Link, useParams } from "react-router-dom";
import "./App.css";

export default function Wishlist() {
  const { state, dispatch } = useContext(WishlistContext);
  const { id } = useParams();

  const [giftName, setGiftName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (state.wishlist) {
      localStorage.setItem(id, JSON.stringify(state));
    }
  }, [state, id]);

  const addGiftHandler = () => {
    if (giftName.trim() === "") {
      setError("Gift name is required");
      return;
    }
    dispatch({
      type: "SET_DATA",
      payload: {
        ...state,
        items: [...state.items, { id: Date.now(), name: giftName, reserved: false }],
      },
    });
    setGiftName("");
    setError("");
  };

  const reserveHandler = (giftId) => {
    const updated = state.items.map((item) =>
      item.id === giftId ? { ...item, reserved: true } : item
    );
    dispatch({ type: "SET_DATA", payload: { ...state, items: updated } });
  };

  if (!state.wishlist) return <p className="container">Loading...</p>;

  return (
    <div className="container">
      <h1>{state.wishlist.title}</h1>
      <p>Owner: {state.wishlist.owner}</p>

      <input
        value={giftName}
        onChange={(e) => setGiftName(e.target.value)}
        placeholder="Gift name"
      />
      <button onClick={addGiftHandler}>Add Gift</button>
      {error && <p className="error">{error}</p>}

      <ul>
        {state.items.map((item) => (
          <li key={item.id}>
            {item.name}{" "}
            {item.reserved ? (
              "🎁 Reserved"
            ) : (
              <button onClick={() => reserveHandler(item.id)}>Reserve</button>
            )}
          </li>
        ))}
      </ul>

      <Link to="/" className="link">Create new wishlist</Link>
    </div>
  );
}
