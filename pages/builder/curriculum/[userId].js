import Menu from "../../../components/Menu/Menu";
import Button from "../../../components/Button";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import {Formik, Field, FieldArray} from "formik";
import {toast} from "react-toastify";
import {useMutation} from "@apollo/client";
import {createCurriculum} from "../../../lib/mutations/curriculumMutation";
import {createDado} from "../../../lib/mutations/dadoMutation";
import {useState} from "react";

const CurriculumBuilder = ({ data }) => {
    const { userId } = data;
    console.log(data)
    const [saveCurriculum] = useMutation(createCurriculum)
    const [saveDado] = useMutation(createDado)
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
    const handleSaveCurriculum = (curriculumData) => {
        saveDado({
            variables:{
                input:{
                    data:{
                        visits: 0
                    }
                }
            }
        })
            .then(async (response) => {
                saveCurriculum({
                    variables:{
                        input:{
                            data:{
                                dadoId: parseInt(response.data.createDado.dado.id),
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
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            })
            .catch(e => {
                console.log(e)
            })
    }
    return(
        <div className="flex">
            <Menu/>
            <main className="flex flex-col w-screen">
                <nav
                    className="
                        bg-white
                        w-full
                        flex
                        justify-center
                    "
                >
                    <Link href={`dashboard/curriculums/${userId}`}>
                        <Button className="m-2">Dashboard</Button>
                    </Link>
                    <Link href={`/builder/curriculum/${userId}`}>
                        <Button className="m-2">New Curriculum</Button>
                    </Link>
                    <Link href={`/mycurriculums/${userId}`}>
                        <Button className="m-2">My Curriculums</Button>
                    </Link>
                </nav>
                <section className="w-full h-20 bg-gray-200 flex justify-center items-center">
                    <h1 className="font-bold text-xl">New Curriculum</h1>
                </section>
                <section className="flex justify-center mt-12">
                    <Formik
                        initialValues={{
                            name: '',
                            degree: '',
                            study: [],
                            skills:[],
                            experience:[],
                            personalDesc: '',
                            contact:[],
                            theme: "white"
                        }}
                        onSubmit={(values) => {
                            console.log(values)
                            handleSaveCurriculum(values)
                        }}
                    >
                        {({
                              values,
                              handleSubmit,
                        }) => (
                            <form
                                className="flex-col items-center justify-center"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <label htmlFor="image">Foto</label>
                                    <input
                                        name="image"
                                        type="file"
                                        className="border m-2 block"
                                        onChange={imageHandler}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="name">Nome</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        className="border m-2 block"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="degree">Formação</label>
                                    <Field
                                        type="text"
                                        name="degree"
                                        className="border m-2 block"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="degree">Descrição pessoal</label>
                                    <Field
                                        type="text"
                                        name="personalDesc"
                                        className="border m-2 block"
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
                                                { values.experience && values?.experience?.length > 0 ? (
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
                                                { values.skills && values?.skills?.length > 0 ? (
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
                                                            Adicionar contato
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
                                        </Field>
                                    </div>
                                    <div className="justify-self-center text-center m-2">
                                   <button type="submit" className="bg-green-500 hover:bg-green-300 rounded w-24">Enviar</button>
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

CurriculumBuilder.getInitialProps = async (ctx) => {
    const data = ctx.query
    return { data }
}

CurriculumBuilder.auth = true;
export default CurriculumBuilder;
