import React from "react";
import { Button, Container, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

const Contact = () => {
  //
  const {
    register,
    handleSubmit,
    // ここを変更します
    // formState,
    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
    //
    getValues,
    watch,
    reset //resetを今追加
  } = useForm();

  // resetの処理
  const handleReset = () => {
    //後でやります
    reset();
  };

  // フォーム送信時の処理
  const onSubmit = (data) => {
    // バリデーションチェックOK！なときに行う処理を追加
    console.log(isDirty);
    console.log(submitCount);
  };

  const emailData = watch("email");
  const nameValue = getValues("name");
  // console.log(emailData, "watch");
  // console.log(emailValue, "getbalue");
  // console.log(errors, "error");

  //
  return (
    <div>
      <h1>会員登録</h1>
      {!nameValue && <div>名前が入力されてません!!！</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="sm" sx={{ pt: 5 }}>
          <Stack spacing={3}>
            <TextField
              label="メールアドレス"
              type="email"
              {...register("email", {
                required: true,
                maxLength: 2,
                minLength: 1,
                message: "bakbakabakbakbabka"
              })}
              error={"name" in errors}
            />

            <TextField
              label="部屋の名前"
              type="text"
              {...register("room", {
                required: true,
                maxLength: 2,
                minLength: 1,
                message: "bakbakabakbakbabka"
              })}
              error={"name" in errors}
            />
            <TextField
              label="物件名"
              type="text"
              {...register("email", {
                required: true,
                maxLength: 2,
                minLength: 1,
                message: "bakbakabakbakbabka"
              })}
              error={"name" in errors}
            />
            {/* {errors.email && <div>メールアドレスエラー</div>} */}

            <TextField
              label="お名前"
              {...register("name", {
                required: true,
                maxLength: 2,
                minLength: 1
              })}
            />
            <TextField
              label="パスワード"
              type="password"
              {...register("password")}
            />
            <Button
              onClick={onSubmit}
              color="primary"
              variant="contained"
              size="large"
              type="submit"
            >
              作成
            </Button>

            <div onClick={handleReset}>reset</div>
          </Stack>
        </Container>
      </form>
    </div>
  );
};

export default Contact;