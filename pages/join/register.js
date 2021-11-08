import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import {useMutation} from "@apollo/client";
import { userRegister as register } from "../../lib/mutations/userMutations"
import apolloErrorHandler from "../../utils/apolloErrorHandler";
import {useRouter} from "next/router";
import {LOGIN_PATH} from "../../lib/constants";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
    const [userRegister] = useMutation(register);
    const [error, setError] = useState('');
    const router = useRouter();
    const initialValues = {
        user:"",
        email:"",
        password:"",
    }
    const handleSubmit = ({user, email, password}) => {
        userRegister({
            variables:{
                input: {
                    username: user,
                    email,
                    password
                }
            }
        })
            .then(response => {
                toast.configure()
                toast('Registrado com sucesso!',{
                    position: "bottom-center",
                    autoClose: 3000,
                    closeOnClick: true
                })
                router.push(LOGIN_PATH);
            })
            .catch(error => {
                setError(apolloErrorHandler(error))
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
                            <div className="font-bold text-xl mb-2">REGISTRO</div>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                <Form>
                                    <label className="flex flex-col items-start p-2">
                                        Nome de usuário
                                        <Field
                                            name="user"
                                            placeholder="nome de usuário"
                                            required
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
                                        E-mail
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="email"
                                            required
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
                                        Senha
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="senha"
                                            required
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
                                        Cadastrar
                                    </Button>
                                </Form>
                            </Formik>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
