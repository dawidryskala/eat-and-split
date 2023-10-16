import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
    obligations: 0,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
    obligations: 0,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
    obligations: 0,
  },
];

export default function App() {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [friendsList, setFriendsList] = useState(initialFriends);
  const [isAnyFriendSelected, setIsAnyFriendSelected] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState();
  const [splitBillObj, setSplitBillObj] = useState({ whoIsPaying: "You" });

  return (
    <div className="main">
      <div className="main-content">
        <Friends
          friendsList={friendsList}
          onFriendsList={setFriendsList}
          onIsAddFriendOpen={setIsAddFriendOpen}
          isAddFriendOpen={isAddFriendOpen}
          onIsAnyFriendSelected={setIsAnyFriendSelected}
          selectedFriendId={selectedFriendId}
          onSelectedFriendId={setSelectedFriendId}
          onSplitBillObj={setSplitBillObj}
        />
        <SplitBill
          friendsList={friendsList}
          onFriendsList={setFriendsList}
          isAnyFriendSelected={isAnyFriendSelected}
          selectedFriendId={selectedFriendId}
          splitBillObj={splitBillObj}
          onSplitBillObj={setSplitBillObj}
        />
      </div>
    </div>
  );
}

function Friends({
  friendsList,
  onFriendsList,
  isAddFriendOpen,
  onIsAddFriendOpen,
  onIsAnyFriendSelected,
  selectedFriendId,
  onSelectedFriendId,
  onSplitBillObj,
}) {
  function handleIsAddFriendOpen() {
    onIsAddFriendOpen(!isAddFriendOpen);
  }

  return (
    <div className="friends">
      {friendsList.map((friend, i) => (
        <Friend
          friend={friend}
          onFriendsList={onFriendsList}
          onIsAnyFriendSelected={onIsAnyFriendSelected}
          selectedFriendId={selectedFriendId}
          onSelectedFriendId={onSelectedFriendId}
          onSplitBillObj={onSplitBillObj}
          key={i}
        />
      ))}
      {isAddFriendOpen ? (
        <AddFriend friendsList={friendsList} onFriendsList={onFriendsList} />
      ) : null}
      <button
        className="open-add-or-close-button"
        onClick={handleIsAddFriendOpen}
      >
        {isAddFriendOpen ? "Close" : "Add Friend"}
      </button>
    </div>
  );
}

function Friend({
  friend,
  onFriendsList,
  onIsAnyFriendSelected,
  selectedFriendId,
  onSelectedFriendId,
  onSplitBillObj,
}) {
  function handleClick(id) {
    onIsAnyFriendSelected(selectedFriendId !== id ? true : false);
    onSelectedFriendId(selectedFriendId !== id ? id : null);

    if (selectedFriendId !== id) {
      onSplitBillObj({
        whoIsPaying: "You",
      });
    }
    console.log(id);
  }

  function handleDelete(id) {
    onFriendsList((prevFriendList) =>
      prevFriendList.filter((friend) => {
        if (friend.id === id) {
          return null;
        }
        return friend;
      })
    );
  }

  let customStyle;

  if (friend.obligations === 0) {
    customStyle = {
      color: "black",
    };
  } else if (friend.obligations > 0) {
    customStyle = {
      color: "green",
    };
  } else {
    customStyle = {
      color: "red",
    };
  }

  return (
    <div
      className="friend"
      style={
        selectedFriendId === friend.id
          ? { backgroundColor: "#ffe8cc" }
          : { backgroundColor: "#ffff" }
      }
    >
      <img
        src={friend.image ? friend.image : "https://i.pravatar.cc/48?u=933372"}
        alt={friend.name + " image"}
      />
      <div className="friend-description">
        <p className="friend-description-name">{friend.name}</p>
        <p style={customStyle}>
          {friend.obligations === 0
            ? "You and " + friend.name + " are even"
            : friend.obligations > 0
            ? friend.name + " owes you " + friend.obligations + "$"
            : "You owe " + friend.name + " " + friend.obligations * -1 + "$"}
        </p>
      </div>
      <div className="friend-buttons-div">
        <button
          className="friend-select-button"
          onClick={() => handleClick(friend.id)}
        >
          {selectedFriendId !== friend.id ? "Select" : "Close"}
        </button>

        <button
          className="friend-delete-button"
          onClick={() => handleDelete(friend.id)}
          style={selectedFriendId === friend.id ? { visibility: "hidden" } : {}}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function AddFriend({ friendsList, onFriendsList }) {
  const [friendName, setFriendName] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  function Add(e) {
    e.preventDefault();

    const imgUrlExtension = imgUrl.slice(-4);

    switch (imgUrlExtension) {
      case ".png":
        console.log(imgUrlExtension);
        addFriend(imgUrl);
        break;
      case ".jpg":
        console.log(imgUrlExtension);
        addFriend(imgUrl);
        break;
      case ".jpeg":
        console.log(imgUrlExtension);
        addFriend(imgUrl);
        break;
      case ".gif":
        console.log(imgUrlExtension);
        addFriend(imgUrl);
        break;
      case ".svg":
        console.log(imgUrlExtension);
        addFriend(imgUrl);
        break;
      default:
        console.log(imgUrlExtension);
        addFriend(
          "https://www.freeiconspng.com/thumbs/head-icon/head-icon-0.png"
        );
    }

    function addFriend(url) {
      onFriendsList((oldArray) => [
        ...oldArray,
        {
          id: Date.now(),
          name: friendName,
          image: url,
          obligations: 0,
        },
      ]);
    }

    setFriendName("");
    setImgUrl("");
    console.log(friendsList);
  }

  return (
    <div className="add-friend-div">
      <form onSubmit={(e) => Add(e)}>
        <label>👨‍👩‍👧‍👦 Friend name</label>
        <input
          type="text"
          name="friendName"
          placeholder="friend name ..."
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        />

        <label>🌇 Image URL</label>
        <input
          type="text"
          name="imgUrl"
          placeholder="image url ... "
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          // onChange={(e) => handleImgUrlChange(e)}
        />
        <input className="add-friend-submit" type="submit" value="Add" />
      </form>
    </div>
  );
}

function SplitBill({
  friendsList,
  onFriendsList,
  isAnyFriendSelected,
  selectedFriendId,
  splitBillObj,
  onSplitBillObj,
}) {
  const currentFriend = friendsList.filter(
    (friend) => friend.id === selectedFriendId
  );

  function handleSubmit(e) {
    e.preventDefault();

    let obligations;

    if (e.target.whoIsPaying.value === "You") {
      obligations = e.target.bill.value - e.target.yourExpense.value;
      console.log("owns me + " + obligations);

      onFriendsList((prevFriendList) =>
        prevFriendList.map((friend) => {
          if (friend.id === selectedFriendId) {
            return {
              ...friend,
              obligations: Number(friend.obligations) + Number(obligations),
            };
          }
          return friend;
        })
      );
    } else {
      obligations = e.target.yourExpense.value * -1;
      console.log("you owns " + obligations);

      onFriendsList((prevFriendList) =>
        prevFriendList.map((friend) => {
          if (friend.id === selectedFriendId) {
            return { ...friend, obligations: friend.obligations + obligations };
          }
          return friend;
        })
      );
    }
  }

  function handleChangeBill(e) {
    if (!isNaN(e.target.value)) {
      onSplitBillObj({ ...splitBillObj, bill: Number(e.target.value) });
    }
  }

  function handleChangeYourExpense(e) {
    if (
      !isNaN(e.target.value) &&
      Number(splitBillObj.bill) > Number(e.target.value)
    ) {
      onSplitBillObj({ ...splitBillObj, yourExpense: Number(e.target.value) });
    }
  }
  if (isAnyFriendSelected) {
    return (
      <div className="split-bill-div">
        <p className="split-description-p">SPLIT A BILL WITH SARAH</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>💰 Bill value</label>
          <input
            type="text"
            name="bill"
            value={splitBillObj.bill ? splitBillObj.bill : ""}
            onChange={(e) => handleChangeBill(e)}
          />

          <label>🧍‍♂️ Your expense</label>
          <input
            type="text"
            name="yourExpense"
            value={splitBillObj.yourExpense ? splitBillObj.yourExpense : ""}
            onChange={(e) => handleChangeYourExpense(e)}
          />

          <label>🧍‍♂️🧍{currentFriend[0].name}'s expense</label>
          <p className="friend-expense">
            {!splitBillObj.bill && !splitBillObj.yourExpense
              ? ""
              : splitBillObj.bill && !splitBillObj.yourExpense
              ? Number(splitBillObj.bill)
              : Number(splitBillObj.bill) - Number(splitBillObj.yourExpense)}
          </p>

          <label>🤑 Who is paying the bill?</label>
          <select
            name="whoIsPaying"
            onChange={(e) =>
              onSplitBillObj({
                ...splitBillObj,
                whoIsPaying:
                  e.target.value !== undefined ? e.target.value : "You",
              })
            }
          >
            <option>You</option>
            <option>{currentFriend[0].name}</option>
          </select>
          <button>Split bill</button>
        </form>
      </div>
    );
  }
}
