'use client'
import { Button, Label, Spinner, TextInput, Toast } from 'flowbite-react';
import { signIn } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Myprops = {};

export default function Login() {

    const [registerFormData, setRegisterFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });

    const [message, setMessage] = useState<{
        text: string,
        type: 'error' | 'success'
    }>({
        text: "",
        type: "error"
    })

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newdata = { ...registerFormData, [e.target.id]: e.target.value };
        setRegisterFormData(newdata);
    };

    const register = async (firstName: string, lastName: string, email: string, password: string) => {
        try {

            const url = `${process.env.NEXT_PUBLIC_API_HOST}/register`
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                })
            };

            const response = await fetch(url, options)

            if (!response.ok) {
                //todo afficher le champ en erreur à partir de la validation du back
                setMessage({ text: "Erreur lors de la création du compte", type: 'error' })
                return false
            }

            return true

        } catch (error) {
            setMessage({ text: `API error : ${error}`, type: 'error' })
            console.log(error)
        }
    }

    const validateForm = () => {
        if (registerFormData.password != registerFormData.passwordConfirmation) {
            setMessage({ text: "Les mots de passe ne correspondent pas", type: 'error' })
            return false
        }

        if (registerFormData.firstName === '' || registerFormData.lastName === '' || registerFormData.email === '' || registerFormData.password === '' || registerFormData.passwordConfirmation === '') {
            setMessage({ text: 'Tous les champs doivent être saisis', type: 'error' })
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formIsValid = validateForm()
        if(!formIsValid) return 
        setLoading(true)
        const registerOK = await register(registerFormData.firstName, registerFormData.lastName, registerFormData.email, registerFormData.password)
        setLoading(false)
        registerOK && setMessage({
            text: 'Compte créé avec succès ! Vous pouvez vous connecter.',
            type: 'success'
        })
    };

    return (
        <div className="sm:grid sm:grid-cols-2 sm:grid-rows-1 h-screen">
            <div className="hidden sm:block relative shadow-lg">

                <Image src="/images/register-cover.jpg" alt='login page image' fill sizes='50vw' className='object-cover' />

            </div>

            <div className="bg-secondary h-screen">
                <div className="h-full flex flex-col justify-center items-center 	">
                    <h1 className="font-titles text-3xl text-primary text-center mb-3">
                        Créer un compte
                    </h1>

                    <form method="post" className="flex flex-col gap-3 w-72" onSubmit={handleSubmit}>

                        <div>
                            <Label htmlFor="firstName">Prénom</Label>
                            <TextInput type="text" id="firstName" required value={registerFormData.firstName} onChange={handleChange} />

                            <Label htmlFor="lastName">Nom de famille</Label>
                            <TextInput type="text" id="lastName" required value={registerFormData.lastName} onChange={handleChange} />

                            <Label htmlFor="email">Email</Label>
                            <TextInput type="text" id="email" required value={registerFormData.email} onChange={handleChange} />

                            <Label htmlFor="password">Mot de passe</Label>
                            <TextInput type="password" id="password" required value={registerFormData.password} onChange={handleChange} />

                            <Label htmlFor="password">Mot de passe (confirmation)</Label>
                            <TextInput type="password" id="passwordConfirmation" required value={registerFormData.passwordConfirmation} onChange={handleChange} />

                        </div>

                        <Button onClick={handleSubmit}>
                            <div className="flex gap-2">
                                Connexion
                                {loading && <Spinner />}
                            </div>
                        </Button>
                        <Link className='underline' href="/login">Se connecter</Link>
                        {message.text && <Toast className={`h-fit text-white ${message.type === 'error' ? 'bg-red-300' : 'bg-green-300'}`}>{message.text}</Toast >}

                    </form>
                </div>
            </div>
        </div>
    );
}