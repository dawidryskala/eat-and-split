import { AddFriend } from "./AddFriend";
import { Friend } from "./Friend";

export function Friends({
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
