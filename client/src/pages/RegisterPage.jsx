import { useForm } from "react-hook-form";
// import { registerReq } from "../api/auth";
import { useAuth } from "../context/authcontext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, isAuthenticated, errors: registerErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);

    // const res = await registerReq(values);
    // console.log(res);
    // alert(`User ${values.username} succesfully created`);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <h1 className="text-2xl font-bold">Register</h1>
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="username"
          />
          {errors.username && (
            <p className="text-red-500">username is required</p>
          )}

          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="email"
          />
          {errors.email && <p className="text-red-500">email is required</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="password"
          />
          {errors.password && (
            <p className="text-red-500">password is required</p>
          )}

          <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded-md my-2"
          >
            Register
          </button>
        </form>

        <p className="flex gap-x-2 justify-between">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
