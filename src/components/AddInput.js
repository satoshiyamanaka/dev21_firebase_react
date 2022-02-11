import React, { useState } from "react";
import { storage, db } from "../firebase";
//Firebase ver9 compliant
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


const AddInput = () => {
  // 画像を保持するには必ずuseStateを準備。
  //画像を保持する箱textvalueと、入力された文字を保持する箱image2つを用意します
  const [textValue, setTextValue] = useState();
  const [image, setImage] = useState(null);

  //取得する場合は、onChangeImageHandlerという処理で、inputを押すと、
  //e.target.files[0]で0番目に画像が入ってくる仕様になっている。画像を保持する
  const onChangeImageHandler = (e) => {
    console.log(e.target.files[0], "e.target.files[0]");
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      e.target.value = "";  //そしてこれで画像を表示する
    }
  };

  //ボタンを押したら送信されますという処理
  const sendClick = (e) => {
    e.preventDefault();  //preventDefault→submitされたときリロードされるのを防ぎ、以下の処理を行う
    if (image) {      //画像があるとき
      //firebaseの仕様で同じファイル名の画像を複数回アップしてしまうと後元のファイルが削除されてしまう
      //そのためにファイル名をランダムに作成する必要があるので「JSのテクニック」でランダムなファイル名を作成
    
    } else {
      //Firebase ver9 compliant
      addDoc(collection(db, "posts"), {
        image: "",
        text: textValue,
        timestamp: serverTimestamp(),
      });
    }
    // useStateを空にする=入力欄を空白にする処理
    setImage(null);
    setTextValue("");
  };
  return (
    <div>
      {/* 登録の処理 */}
      {/* 記述1. formの中の処理を実行、タグを記述。onSubmitはボタン押されたら sendClick 実行するぜという意味*/}
      <form onSubmit={sendClick}>

        {/* 記述2.文字登録のinputを用意する */}
        <input
          placeholder="文字を入力"
          type="text"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
        {/* 記述3.画像登録のinputを用意する */}
        <input type="file" onChange={onChangeImageHandler} />
        <button
          type="submit"
          disabled={!textValue} //textValueが空の時は送信できないHtml等の技術
        >
          送信する
        </button>
        <hr />
      </form>
     </div>
  );
};
export default AddInput;