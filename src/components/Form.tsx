import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  //   console.log(watch("email")); // watch input value by passing the name of it
  console.log(errors);

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label>Email</label>
        <input
          placeholder="user@rapptrlabs.com"
          {...register("email", {
            required: "Not a valid email",
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: "Not a valid email",
            },
            maxLength: {
              value: 50,
              message: "Not a valid email",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <label>Password</label>
        <input
          type="password"
          placeholder="Must be at least 4 characters"
          {...register("password", {
            required: "Not a valid password",
            minLength: {
              value: 4,
              message: "Not a valid password",
            },
            maxLength: {
              value: 16,
              message: "Not a valid password",
            },
          })}
        />
        {errors.password && <span>Not a valid password</span>}

        <input type="submit" value="Login" className={!errors ? "btn" : "btn-error"} />
      </form>
  );
}
