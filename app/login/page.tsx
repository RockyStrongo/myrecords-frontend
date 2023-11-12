'use client'
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Myprops = {};

export default function Login() {
    const searchParams = useSearchParams()
 
    const authError = searchParams.get('error')
  
    const router = useRouter();

    const goToCreateOrganization = () => {
        router.push("/new-organization");
    };

    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("here")
        const newdata = { ...loginFormData, [e.target.id]: e.target.value };
        setLoginFormData(newdata);
    };

    const login = async () => {
        try {
            setLoading(true)
            const res = await signIn("credentials", {
                email: loginFormData.email,
                password: loginFormData.password,
                callbackUrl: '/'
            });

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        login()
    };

    return (
        <div className="sm:grid sm:grid-cols-2 sm:grid-rows-1 h-screen">
            {/* <div className="hidden sm:block  bg-[url('/images/coverLogin.jpg')] bg-no-repeat bg-cover"></div> */}
            <div className="hidden sm:block  bg-no-repeat bg-cover"></div>

            <div className="bg-secondary h-screen">
                <div className="h-full flex flex-col justify-center items-center	">
                    <h1 className="font-titles text-3xl text-primary text-center">
                        Login
                    </h1>

                    <form method="post" className="flex flex-col" onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input className="text-black" type="text" id="email" required value={loginFormData.email} onChange={handleChange} />

                        <label htmlFor="password">Password</label>
                        <input className="text-black" type="text" id="password" required value={loginFormData.password} onChange={handleChange} />

                        <button>Login</button>
                        {authError && authError === "CredentialsSignin" &&  <div>Invalid credentials</div> }
                    </form>
                </div>
            </div>
        </div>
    );
}