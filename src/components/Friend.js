export function Friend({
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
