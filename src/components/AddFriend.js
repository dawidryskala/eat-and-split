import { useState } from "react";

export function AddFriend({ friendsList, onFriendsList }) {
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
        />
        <input className="add-friend-submit" type="submit" value="Add" />
      </form>
    </div>
  );
}
