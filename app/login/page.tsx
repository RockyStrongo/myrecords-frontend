'use client'
import { Button, Label, Spinner, TextInput, Toast } from 'flowbite-react';
import { signIn } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Myprops = {};

export default function Login() {
    const searchParams = useSearchParams()
    const authError = searchParams.get('error')

    useEffect(() => {
        authError ? setMessage("Identifiants incorrects") : null
    }, [authError])


    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState('')

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const validateForm = () => {
        if (loginFormData.email === '' || loginFormData.password === '') {
            setMessage('Tous les champs doivent-être saisis.')
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formIsValid = validateForm()
        formIsValid && login()
    };

    return (
        <div className="sm:grid sm:grid-cols-2 sm:grid-rows-1 h-screen">
            <div className="hidden sm:block relative shadow-lg">
                <Image src="/images/login-cover.jpg" alt='login page image' fill sizes='50vw' className='object-cover' />
            </div>

            <div className="bg-secondary h-screen">
                <div className="h-full flex flex-col justify-center items-center">
                    <h1 className="font-titles text-3xl text-primary text-center mb-3">
                        Se connecter
                    </h1>

                    <form method="post" className="flex flex-col gap-3 w-72" onSubmit={handleSubmit}>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <TextInput type="text" id="email" required value={loginFormData.email} onChange={handleChange} />

                            <Label htmlFor="password">Mot de passe</Label>
                            <TextInput type="password" id="password" required value={loginFormData.password} onChange={handleChange} />
                        </div>

                        <Button onClick={handleSubmit}>
                            <div className="flex gap-2">
                                Connexion
                                {loading && <Spinner />}
                            </div>
                        </Button>
                        <Link className='underline' href="/register">Créer un compte</Link>
                        {message && <Toast className='bg-red-300 h-fit text-white'>{message}</Toast >}

                    </form>
                </div>
            </div>
        </div>
    );
}