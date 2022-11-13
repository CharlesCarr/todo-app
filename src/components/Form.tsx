import { useForm, SubmitHandler } from "react-hook-form";
import { AiTwotoneLock } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-1/2 justify-center items-center pt-3"
    >
      <label className="w-1/2">Email</label>
      <div className="flex items-center justify-start border border-black rounded w-1/2 pl-2 mb-3">
        <BsFillPersonFill className="mr-2" />
        <input
          placeholder="user@rapptrlabs.com"
          className="w-full focus:border-none"
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
      </div>
      {errors.email && <span className="text-red-600">{errors.email.message}</span>}

      <label className="w-1/2">Password</label>
      <div className="flex items-center justify-start border border-black rounded w-1/2 pl-2 mb-6">
        <AiTwotoneLock className="mr-2" />
        <input
          type="password"
          className="w-full"
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
      </div>
      {errors.password && <span className="text-red-600">Not a valid password</span>}

      <input
        type="submit"
        value="Login"
        className="w-20 border border-black py-2 px-4 rounded-xl cursor-pointer"
      />
    </form>
  );
}
