import React, { FormEventHandler, forwardRef, useRef, useState } from "react";
import styles from "./index.module.css";
import { Button, InputProps, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useLogin, Login as DefaultLogin } from "react-admin";
import { useRegister } from "@/hooks/useRegister";

interface IRegisterForm {
  email: string;
  username: string;
  password: string;
}

interface ILabelInput extends InputProps {
  name: string;
  label: string;
  type?: string;
}
const LabelInput = forwardRef<any, ILabelInput>(
  ({ label, type, ...field }, ref) => {
    return (
      <TextField
        required
        label={label}
        variant="standard"
        type={type}
        {...field}
        ref={ref}
      />
    );
  }
);
LabelInput.displayName = "LabelInput";

const Login = () => {
  const [isNewLogin, setIsNew] = useState(true);
  const { control, getValues } = useForm<IRegisterForm>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    mode: "onChange",
  });
  // const login = useLogin()
  const register = useRegister();

  const onSubmit = ((event) => {
    event.preventDefault();
    const formData = getValues();
    register(formData);
  }) satisfies FormEventHandler;
  if (isNewLogin)
    return (
      <form className={styles.center} onSubmit={onSubmit}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <LabelInput label="Email Address" type="email" {...field} />
          )}
        />
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <LabelInput label="Username" {...field} />}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <LabelInput label="password" type="password" {...field} />
          )}
        />
        <Button color="primary" variant="contained" type="submit">
          Register and Sign in
        </Button>
        <Button onClick={() => setIsNew(false)}>Already has an account?</Button>
      </form>
    );
  else return <DefaultLogin />;
};

export default Login;
