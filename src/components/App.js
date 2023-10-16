import { useState } from "react";
import { Friends } from "./Friends";
import { SplitBill } from "./SplitBill";

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
