import React from 'react';
import { Formik, Form, Field } from 'formik';
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";

const Register = () => {
    const initialValues = {
        user:"",
        email:"",
        password:"",
    }
    const handleSubmit = (values) => {
        console.log(values)
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
                            <div className="font-bold text-xl mb-2">REGISTER</div>
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
