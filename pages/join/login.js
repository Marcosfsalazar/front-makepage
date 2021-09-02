import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import { signIn } from 'next-auth/client'
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
    const [error, setError] = useState();
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
                if(response.error){
                    setError(response.error)
                    return;
                }
                toast.configure();
                toast('Logado com sucesso!',{
                    position: "bottom-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    hideProgressBar: true,
                })
                router.push('/home/')
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
                                        required
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
                                                required
                                            "
                                    />
                                </label>
                                {error &&
                                    <div
                                        className="
                                            text-white
                                            text-sm
                                            font-medium
                                            border
                                            bg-red-500
                                            p-2
                                            rounded
                                            required
                                        "
                                    >
                                        { error }
                                    </div>
                                }
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

