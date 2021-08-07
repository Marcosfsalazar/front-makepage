import React from 'react';
import { Formik, Form, Field } from 'formik';
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import { signIn, useSession } from 'next-auth/client'
import {useRouter} from "next/router";

const Login = () => {
    const session =  useSession()
    const initialValues = {
        email:"",
        password:"",
    }
    const router = useRouter()
    const handleSubmit = async (values) => {
        const response = await signIn('credentials',{
            redirect:false,
            username: values.email,
            password: values.password,
        })
            .then((response) => {
                router.push('/protected/')
            })
            .catch(e => {
                throw new Error(e)
            })
    }
    return(
        <div className="
            w-screen
            h-screen
            max-h-screen
            md:w-full
            md:h-screen
            sm:w-full
            sm:h-screen
            overflow-hidden
            flex
            flex-col
            bg-gray-100
        ">
            <Navbar />
            <div
                className="
                h-full
                w-full
                flex
                flex-col
                justify-center
                items-center
                justify-self-center
                self-center
                "
            >
                <div className="max-w-sm text-center rounded overflow-hidden shadow-lg border rounded">
                    <div className="px-6 py-4 space-y-4">
                        <div className="font-bold text-xl mb-2">LOGIN</div>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <label className="flex flex-col items-start p-2">
                                    Email
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        className="
                                                border
                                                border-gray-600
                                                rounded
                                                hover:border-2
                                                font-mono
                                                font-medium
                                                p-1
                                            "
                                    />
                                </label>
                                <label className="flex flex-col items-start p-2">
                                    Password
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        className="
                                                border
                                                border-gray-600
                                                rounded
                                                hover:border-2
                                                font-mono
                                                font-medium
                                                p-1
                                            "
                                    />
                                </label>
                                <Button
                                    type="submit"
                                    className="
                                            bg-blue-500
                                            text-white
                                            mt-4
                                            hover:bg-blue-600
                                            hover:font-bold
                                        "
                                >
                                    Entrar
                                </Button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

