import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,  //ログインされているか、認証してるかチェックするときはこれ使います
  createUserWithEmailAndPassword,  //登録するときはこれ使います
  signInWithEmailAndPassword,  //サインするときはこちら使います
} from "firebase/auth";

//ここ↓は、ログインしている状態かどうかのstate email入力のstate password入力んstateを準備
const Login = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//このuseEffectでログインしているかどうかの判断をしていて、ログインしていればFeedコンポ年とが表示されます
  useEffect(() => {
    //Firebase ver9 compliant (modular)
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user, "user情報");
      user && props.history.push("/");
    });
    return () => unSub();
  }, [props.history]);


  //<h1>はisLoginの true or falseによって表示される文字を変更している
  //<input> emailとpassword を認証で利用するのでonChangeを使って入力された情報をstateに保持している
  return (
    <div>
      <h1>{isLogin ? "ログイン画面" : "新規登録画面"}</h1> 
      <hr />
      <input
        type="text"
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={
          isLogin
            ? async () => {
                try {
                  //Firebase ver9 compliant (modular)
                  await signInWithEmailAndPassword(auth, email, password);
                  //ここがLoginに関する処理。isLoginがtrue＝ログインするとき。false＝登録するとき。
                  props.history.push("/");
                } catch (error) {
                  alert(error.message);
                }
              }
            : async () => {
                try {
                  //Firebase ver9 compliant (modular)
                  await createUserWithEmailAndPassword(auth, email, password);
                  props.history.push("/");
                } catch (error) {
                  alert(error.message);
                }
              }
        }
      >
        {isLogin ? "ログイン" : "新規登録"}
      </button>
      <hr />
      <span onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "新規登録はこちら" : "ログインに戻る"}
      </span>
    </div>
  );
};
export default Login;