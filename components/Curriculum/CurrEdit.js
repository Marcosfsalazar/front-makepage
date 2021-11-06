import Button from "../Button";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import {Formik, Field, FieldArray} from "formik";
import {toast} from "react-toastify";
import {useMutation, useQuery} from "@apollo/client";
import {updateCurriculum} from "../../lib/mutations/curriculumMutation";
import {currQuery} from "../../lib/queries/CurrQueries";
import {useEffect, useState} from "react";

const CurrEdit = ({ currId, userId, setOpenModal }) => {
    const [updtCurriculum] = useMutation(updateCurriculum);
    const [img, setImg] = useState();
    const imageHandler = (e) => {
        const reader = new FileReader(e);
        reader.onload = () => {
            if(reader.readyState === 2 ){
                setImg({imgLink: reader.result})
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    const { data, loading } = useQuery(currQuery,{
        variables:{
            currId: parseInt(currId)
        }
    })
    useEffect(() => {
        setImg({imgLink:data?.curriculum?.data?.image?.imgLink})
    },[data])
    if(loading){
        return "loading..."
    }
    const handleUpdateCurriculum = (curriculumData) => {
        updtCurriculum({
            variables:{
                input:{
                    where: {
                        id: parseInt(currId),
                    },
                    data:{
                        userId: parseInt(userId),
                        data:{
                            ...curriculumData,
                            image: img
                        }
                    }
                }
            }
        })
            .then(async (response) => {
                if(response){
                    console.log(response)
                    toast.configure()
                    toast('Salvo com sucesso!',{
                        position: "bottom-center",
                        autoClose: 3000,
                        closeOnClick: true,
                        type: "success",
                    })
                    setOpenModal(false);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
    return(
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
            <main className="flex flex-col w-screen h-screen">
                <section className="flex justify-center text-md 2xl:text-xl">
                    <Formik
                        initialValues={{
                            name: data?.curriculum.data?.name,
                            degree: data?.curriculum.data?.degree,
                            study: data?.curriculum.data?.study,
                            skills:data?.curriculum.data?.skills,
                            experience:data?.curriculum.data?.experience,
                            personalDesc: data?.curriculum.data?.personalDesc,
                            contact:data?.curriculum.data?.contact,
                            theme: data?.curriculum.data?.theme
                        }}
                        onSubmit={(values) => {
                            console.log(values)
                            handleUpdateCurriculum(values)
                        }}
                    >
                        {({
                              values,
                              handleSubmit,
                          }) => (
                            <form
                                className="flex-col w-100 items-center justify-center"
                                onSubmit={handleSubmit}
                            >
                                <div className="overflow-hidden 2xl:text-md w-30">
                                    <label htmlFor="image">Trocar Foto (limite 700kb)</label>
                                        <input
                                            name="image"
                                            type="file"
                                            className="border m-2 block"
                                            onChange={imageHandler}
                                        />
                                </div>
                                <div>
                                    <label htmlFor="name" className="font-bold">Nome</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        className="border m-2 block"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="degree" className="font-bold">Formação</label>
                                    <Field
                                        type="text"
                                        name="degree"
                                        className="border m-2 block"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="degree" className="font-bold">Descrição pessoal</label>
                                    <Field
                                        type="text"
                                        name="personalDesc"
                                        className="border m-2 block"
                                        as="textarea"
                                    />
                                </div>
                                <div>
                                    <div className="font-bold border-b">Ensino</div>
                                    <FieldArray
                                        name="study"
                                        render={arrayHelpers =>(
                                            <div>
                                                { values.study && values.study.length > 0 ? (
                                                    values.study.map((skill, index) => (
                                                            <div key={index}>
                                                                <label htmlFor={`study.${index}.college`}>Instituição*</label>
                                                                <Field
                                                                    name={`study.${index}.college`}
                                                                    className="border m-2 block"
                                                                    required
                                                                />
                                                                <label htmlFor={`study.${index}.desc`}>Desc.</label>
                                                                <Field
                                                                    type="text"
                                                                    name={`study.${index}.desc`}
                                                                    className="border m-2 block"
                                                                />
                                                                <div className="flex ml-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => arrayHelpers.remove(index)}
                                                                        className="p-1 m-1 w-4 h-4 bg-red-500 flex items-center"
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => arrayHelpers.insert(index, '')}
                                                                        className="p-1 m-1 w-4 h-4 flex items-center bg-green-500"
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => arrayHelpers.push('')}
                                                        className="bg-yellow-500 rounded mt-2 w-40"
                                                    >
                                                        Adicionar Estudo
                                                    </button>
                                                )
                                                }
                                            </div>
                                        )}
                                    />
                                </div>
                                <div>
                                    <div className="font-bold border-b">Experiência</div>
                                    <FieldArray
                                        name="experience"
                                        render={arrayHelpers =>(
                                            <div>
                                                { values.experience && values.experience.length > 0 ? (
                                                    values.experience.map((skill, index) => (
                                                            <div key={index}>
                                                                <label htmlFor={`experience.${index}.local`}>Local*</label>
                                                                <Field
                                                                    name={`experience.${index}.local`}
                                                                    className="border m-2 block"
                                                                    required
                                                                />
                                                                <label htmlFor={`experience.${index}.desc`}>Desc.</label>
                                                                <Field
                                                                    type="text"
                                                                    name={`experience.${index}.desc`}
                                                                    className="border m-2 block"
                                                                />
                                                                <label htmlFor={`experience.${index}.time`}>Tempo*(em meses)</label>
                                                                <Field
                                                                    type="text"
                                                                    name={`experience.${index}.time`}
                                                                    className="border m-2 block"
                                                                    required
                                                                />
                                                                <div className="flex ml-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => arrayHelpers.remove(index)}
                                                                        className="p-1 m-1 w-4 h-4 bg-red-500 flex items-center"
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => arrayHelpers.insert(index, '')}
                                                                        className="p-1 m-1 w-4 h-4 flex items-center bg-green-500"
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => arrayHelpers.push('')}
                                                        className="bg-yellow-500 rounded mt-2 w-40"
                                                    >
                                                        Adicionar Experiência
                                                    </button>
                                                )
                                                }
                                            </div>
                                        )}
                                    />
                                </div>
                                <div>
                                    <div className="font-bold border-b">Habilidades</div>
                                    <FieldArray
                                        name="skills"
                                        render={arrayHelpers =>(
                                            <div>
                                                { values.skills && values.skills.length > 0 ? (
                                                    values.skills.map((skill, index) => (
                                                            <div key={index}>
                                                                <label htmlFor={`skills.${index}.skill`}>Habilidade*</label>
                                                                <Field
                                                                    name={`skills.${index}.skill`}
                                                                    className="border m-2 block"
                                                                    required
                                                                />
                                                                <div className="flex ml-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => arrayHelpers.remove(index)}
                                                                        className="p-1 m-1 w-4 h-4 bg-red-500 flex items-center"
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => arrayHelpers.insert(index, '')}
                                                                        className="p-1 m-1 w-4 h-4 flex items-center bg-green-500"
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => arrayHelpers.push('')}
                                                        className="bg-yellow-500 rounded mt-2 w-40"
                                                    >
                                                        Adicionar habilidade
                                                    </button>
                                                )
                                                }
                                            </div>
                                        )}
                                    />

                                    <div>
                                        <div className="font-bold border-b">Contatos</div>
                                        <FieldArray
                                            name="contact"
                                            render={arrayHelpers =>(
                                                <div>
                                                    { values.contact && values?.contact?.length > 0 ? (
                                                        values.contact.map((skill, index) => (
                                                                <div key={index}>
                                                                    <label htmlFor={`contact.${index}.mail`}>e-mail</label>
                                                                    <Field
                                                                        name={`contact.${index}.mail`}
                                                                        className="border m-2 block"
                                                                    />
                                                                    <label htmlFor={`contact.${index}.phone`}>Telefone</label>
                                                                    <Field
                                                                        type="text"
                                                                        name={`contact.${index}.phone`}
                                                                        className="border m-2 block"
                                                                    />
                                                                    <div className="flex ml-2">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => arrayHelpers.remove(index)}
                                                                            className="p-1 m-1 w-4 h-4 bg-red-500 flex items-center"
                                                                        >
                                                                            -
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => arrayHelpers.insert(index, '')}
                                                                            className="p-1 m-1 w-4 h-4 flex items-center bg-green-500"
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() => arrayHelpers.push('')}
                                                            className="bg-yellow-500 rounded mt-2 w-40"
                                                        >
                                                            Adicionar Contato
                                                        </button>
                                                    )
                                                    }
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <div className="font-bold border-b">Estilo</div>
                                        <label htmlFor="theme">Tema</label>
                                        <Field
                                            name="theme"
                                            as="select"
                                            className="border m-2 block"
                                        >
                                            <option value="white">White</option>
                                            <option value="black">Black</option>
                                            <option value="tomato">Tomato</option>
                                            <option value="darkGray">Dark Gray</option>
                                            <option value="smooth">Smooth</option>
                                            <option value="darkSmooth">Dark Smooth</option>
                                        </Field>
                                    </div>
                                    <div className="justify-self-center text-center m-2">
                                        <button
                                            onClick={() => setOpenModal(false)}
                                            className="bg-red-500 hover:bg-red-300 rounded w-24 mx-1"
                                        >
                                            Cancelar
                                        </button>
                                        <button type="submit" className="bg-green-500 hover:bg-green-300 rounded w-24 mx-1">Salvar</button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </section>
            </main>
        </div>
    )
}

export default CurrEdit;
