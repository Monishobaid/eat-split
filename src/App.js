import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [Friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleOpen() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    //  when we click on the select button again it will get unselect
    setSelectedFriend((current)=>current.id === friend.id? null: friend);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={Friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormaddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleOpen}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendList({ friends, onSelection, selectedFriend }) {
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend} />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  console.log("selectedfrined id",selectedFriend.id);
  console.log("selected friend",friend.id)
  const isSelected = selectedFriend.id === friend.id
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} $ {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && (
        <p>You and your Friend {friend.name} are even</p>
      )}
      <Button onClick={() => onSelection(friend)}>{isSelected? 'Close': 'Select'}</Button>
    </li>
  );
}

function FormaddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !img) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${img}?=${id}`,
      balance: 0,
    };
    console.log(newFriend);
    onAddFriend(newFriend);

    setName("");
    setImg("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>A friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>B image url</label>
      <input type="text" value={img} onChange={(e) => setImg(e.target.value)} />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <div>
      <form className="form-split-bill">
        <h2>Split the bill with {selectedFriend.name}</h2>

        <label>a Bill Value</label>
        <input type="text" />

        <label>b Your Expense</label>
        <input type="text" />

        <label>c {selectedFriend.name}'s Expense</label>
        <input type="text" disabled />

        <label>Who is paying the bill</label>
        <select>
          <option value="user">you</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>

        <Button>Add</Button>
      </form>
    </div>
  );
}
