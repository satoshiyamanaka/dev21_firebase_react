import "./App.css";
import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import button from 'module'

function App() {
  //
  const [data, setData] = useState([
    { id: "", title: "", naiyou: "", point: "", email: "" },
  ]);

  // 登録用のuseState
  const [titleValue, setTitleValue] = useState(); //inputタグのtitleを保持する箱

  // console.log(data, "useStateの箱の方をみましょう！");
  console.log(titleValue, "useStateの箱の方をみましょう！");

  // useEffectの記述は↓
  useEffect(() => {
    // query = コレクション(firebaseの箱のこと)の指定をするfirebaseで用意されたおまじない
    const q = query(collection(db, "group"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          naiyou: doc.data().naiyou,
          point: doc.data().point,
          email: doc.data().email,
        }))
      );
    });

    return () => unsub();
  }, []);

  // 登録の処理 inputタグで入力された文字などを保持するため
  const newData = (e) => {
    setTitleValue(e.target.value);
  };
  // 登録のボタンが押されたら firebaseにデータを送る処理
  const addData = async () => {
    // alert(1);
    // 登録の処理を記述
    await addDoc(collection(db, "group"), { title: titleValue });
    // 登録が終わったら入力欄を空にする
    setTitleValue("");
  };

  //
  return (
    <div className="App">
      {/* 表示のロジックを記述する箇所 */}
      <h1>データ表示</h1>

      {/* 表示のロジックを記述する箇所 */}
      {/* dataというuseStateで保持した箱にはfirebaseのデータが収納されています */}
      {/* 収納されているデータをES6の書き方のmapというおまじないを使ってぐるぐる表示させます */}

      {/* mapを使うときはkeyという指定が必須です！書いていないとエラーとして画面で怒られます！ */}
      {data.map((item, index) => (
        <div key={index}>
          <div>{item.id}</div>
          <div>{item.title}</div>
          <div>{item.naiyou}</div>
          <div>{item.point}</div>
          <div>{item.email}</div>
        </div>
      ))}

      <hr />
      <hr />
      {/* 登録の記述をする箇所 */}
      <h1>登録の処理</h1>
      <p>{titleValue}</p>
      {/* input タグを設置 */}
      <input type="text" value={titleValue} onChange={newData} />
      {/*この下にボタンを設定します */}
      <button onClick={addData}>登録</button>      
      {/* 登録の記述をする箇所 */}
    </div>
  );
}

export default App;