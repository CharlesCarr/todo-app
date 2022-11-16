import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiTwotoneLock } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

type Inputs = {
  email: string;
  password: string;
};

// type FormData = {
// };

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });

  const { loginStatus, setLoginStatus } = useContext(LoginContext);
  const navigate = useNavigate();

  const postData = async ({ email, password }: any) => {
    const URL = "http://dev.rapptrlabs.com/Tests/scripts/user-login.php";
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    const requestOptions: any = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(URL, requestOptions);
      if (!response.ok) {
        const message = `${response.status} ${response.statusText}`;
        throw new Error(message);
      }
      const responseData = await response.json();
      setLoginStatus("success");
      navigate("/");
    } catch (err: any) {
      // only network errors (so throw error from above check)
      console.error(err);
      if (err.message === "401 Unauthorized") {
        setLoginStatus("failed");
      } else {
        setLoginStatus("error");
      }
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (Object.keys(errors).length === 0) {
      // submit data to server (POST)
      postData(data);
    } else {
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full justify-center items-center pt-3"
    >
      <label className="w-3/4 md:w-1/2 mb-2">Email</label>
      <div
        className={`flex items-center justify-start border ${
          errors.email ? "border-red-600" : "border-white"
        } rounded w-3/4 md:w-1/2 pl-2 mb-3`}
      >
        <BsFillPersonFill className="w-6 h-6 mr-4" />
        <input
          placeholder="user@rapptrlabs.com"
          className="w-full focus:outline-none active:bg-none bg-[#0b131b] placeholder:text-[#398ebb] placeholder:font-light py-1"
          {...register("email", {
            required: "Email required",
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: "Not a valid email",
            },
            maxLength: {
              value: 50,
              message: "Not a valid email length",
            },
          })}
        />
      </div>
      {errors.email && (
        <span className="text-red-600 w-3/4 md:w-1/2 text-sm mb-3">
          {errors.email.message}
        </span>
      )}

      <label className="w-3/4 md:w-1/2 mb-2">Password</label>
      <div
        className={`flex items-center justify-start border ${
          errors.password ? "border-red-600 mb-3" : "border-white mb-6"
        } rounded w-3/4 md:w-1/2 pl-2`}
      >
        <AiTwotoneLock className="w-6 h-6 mr-4" />
        <input
          type="password"
          className="w-full focus:outline-none bg-[#0b131b] placeholder:text-[#398ebb] placeholder:font-light py-1"
          placeholder="Must be at least 4 characters"
          {...register("password", {
            required: "Password required",
            minLength: {
              value: 4,
              message: "Not a valid password (too short)",
            },
            maxLength: {
              value: 16,
              message: "Not a valid password (too long)",
            },
          })}
        />
      </div>
      {errors.password && (
        <span className="text-red-600 w-3/4 md:w-1/2 mb-3 text-sm">
          Not a valid password
        </span>
      )}

      <input
        type="submit"
        value="Login"
        className="w-3/4 md:w-1/2 border-2 border-white py-2 px-4 rounded-xl cursor-pointer text-white bg-[#0b131b] tracking-wide text-lg"
      />
      {loginStatus === "error" && (
        <span className="text-red-600 text-center text-sm">
          The server could not be reached. Please try again later.
        </span>
      )}
      {loginStatus === "failed" && (
        <span className="text-red-600 text-center text-sm">
          Invalid login credentials.
        </span>
      )}
    </form>
  );
}
