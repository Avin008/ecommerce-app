import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { LoadingSpinner } from "../components/";
import { useNoAuthRedirect } from "../hooks";
import { useAuthStore } from "../lib/store";
import { loginFunc } from "../services";
import { toast } from "react-hot-toast";

type InitialState = {
  email: string;
  password: string;
};

const initialState: InitialState = {
  email: "",
  password: "",
};

const Login = (): React.ReactElement => {
  const [userData, setUserData] = useState<InitialState>(initialState);
  const router = useRouter();

  const addAuth = useAuthStore((state: any) => state.addAuth);

  const guestLogin = () => {
    setUserData((prev) => ({
      ...prev,
      email: "johndoe@gmail.com",
      password: "123456",
    }));
  };

  const loginUser = async () => {
    try {
      const uid = await loginFunc(userData.email, userData.password);
      router.push("/");
      addAuth(uid);
      toast.success("user successfully logged in!", {
        position: "bottom-center",
      });
    } catch (error) {
      toast.error("something went wrong. please try again!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { loading } = useNoAuthRedirect();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Head>
        <title>Login</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <div className="m-auto h-fit w-96 space-y-2 rounded-md border border-gray-300 bg-slate-50 p-6 shadow-md">
          <h1 className="text-2xl font-semibold text-gray-600">Login</h1>
          <div className="space-y-1">
            <span className="flex flex-col space-y-1">
              <label htmlFor="email">Email</label>
              <input
                className="border border-gray-400 p-2"
                type="email"
                placeholder="johndoe@gmail.com"
                name="email"
                id="email"
                required
                value={userData.email}
                onChange={handleInput}
              />
            </span>
            <span className="flex flex-col space-y-1">
              <label htmlFor="password">Password</label>
              <input
                className="border border-gray-400 p-2"
                type="password"
                placeholder="**********"
                name="password"
                id="password"
                required
                value={userData.password}
                onChange={handleInput}
              />
            </span>
          </div>
          <div className="pt-3">
            <span className="flex flex-col space-y-2">
              <button className="rounded-sm border border-gray-500 p-2 font-semibold">
                Login
              </button>
              <button
                className="rounded-sm bg-yellow-800 p-2 font-semibold text-white"
                onClick={guestLogin}
              >
                Login As Guest
              </button>
            </span>
            <span className="flex justify-center pt-2 font-medium">
              <Link href="/signup">Create New Account</Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
