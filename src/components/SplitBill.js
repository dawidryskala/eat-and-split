export function SplitBill({
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
