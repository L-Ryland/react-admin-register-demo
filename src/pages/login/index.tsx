import React, { FormEventHandler, forwardRef, useMemo, useRef, useState } from "react";
import styles from "./index.module.css";
import { Button, InputProps, TextField } from "@mui/material";
import { useForm, Controller, Control, useFormState } from "react-hook-form";
import { Login as DefaultLogin } from "react-admin";
import { useRegister } from "@/hooks/useRegister";

interface IRegisterForm {
  email: string;
  username: string;
  password: string;
}

interface ILabelInput extends InputProps {
  name: keyof IRegisterForm;
  label: string;
  type?: string;
  control: Control<IRegisterForm>;
}
const LabelInput = forwardRef<any, ILabelInput>(
  ({ control, name, label, type, ...field }, ref) => {
    const { isValid, errors } = useFormState({ control, name })
    const isError = Boolean(errors[name])
    const errorMessage = useMemo(() => {
      const fieldError = errors[name]
      if (!fieldError) return ""
      if (fieldError.type === 'required') {
        return fieldError.message || 'Required'
      }
      return fieldError.message
    }, [errors, name]);
    return (
      <TextField
        label={label}
        variant="standard"
        type={type}
        margin="normal"
        {...field}
        error={isError}
        helperText={isError ? errorMessage : null}
        ref={ref}
      />
    );
  }
);
LabelInput.displayName = "LabelInput";

const Login = () => {
  const [isNewLogin, setIsNew] = useState(true);
  const { control, handleSubmit } = useForm<IRegisterForm>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    mode: "onChange",
  });
  // const login = useLogin()
  const register = useRegister();

  const onSubmit = (formData: IRegisterForm) => {
    // event.preventDefault();
    console.log("[index] [Line 51]: prop", formData);
    register(formData);
  };
  if (isNewLogin)
    return (
      <form className={styles.center} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <LabelInput label="Email Address" type="email" control={control} {...field} />
          )}
        />
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <LabelInput label="Username" control={control} {...field} />}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <LabelInput label="password" type="password" control={control} {...field} />
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
