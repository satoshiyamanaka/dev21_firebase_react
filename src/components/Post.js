import React, { useState } from "react";
import Img from "../img/1.png";
import "../App.css";
import { db } from "../firebase";
import {
  doc,
  collection,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

const Post = ({ id, text, image, timestamp }) => {
  // 更新用のstate
  const [title, setTitle] = useState(text);
  //ポイント！(db, 'posts') このpostsがコレクション（箱）のことなので間違えないように！firestore見たらわかる
  const textRef = collection(db, "posts");

  const editTask = async () => {   //更新するとこ
    await setDoc(           //setDocって更新の時使います。わかりづらいけどReactが決めちゃったから覚えて
      doc(textRef, id),      //テキストを参照っていう意味。どこの場所のIDは何かっていうのを渡してあげる
      {
        text: title,
        timestamp: serverTimestamp(),
      },
      { merge: true }  //マージは上書きしますってこと。Trueは上書きを許可しますてこと
    );
  };
  const deleteTask = async () => {       // 削除するとこ
    await deleteDoc(doc(textRef, id));    //ドキュメント＝IDひとつひとつ。それを削除するてこと
  };
  console.log(id, "props の id");
  return (
    <div className="post">
      {/* 記述1. テキスト(text)情報を受け取る */}
      <div className="text">{text}</div>
      {image && (
        <div className="image">
          <img src={image} alt={text} />
        </div>
      )}
      {!image && (
        <div>
          <img src={Img} alt={text} />
        </div>
      )}
      {/* 記述3. 日付(timestamp)情報を受け取る */}
      {/* 注意！firebaseのtimestampはjsの形式に変換する必要があるのでnew Dateを使用している */}
      <div className="date">
        {new Date(timestamp?.toDate()).toLocaleString()}
      </div>
      <hr />
      {/* 更新用のinput */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* 編集、削除のボタンを設置 */}
      <button onClick={editTask}>編集</button>
      <button onClick={deleteTask}>削除</button>
    </div>
  );
};
export default Post;