import Icons from "../../Icons/Icons";

const CardOneEdit = ({ data }) => {

    return(
        <div
            className="
                bg-black
                w-3/6
                h-80
                flex
                shadow-md"
        >
            <div className="flex flex-col items-center w-1/3">
                {data?.img?.imgLink ?
                    <img className="
                        rounded-full
                        mt-6
                        mb-1
                        w-32
                        h-32
                        bg-gray-100"
                         src={data?.img?.imgLink}
                         alt="profile picture"
                    />
                    :
                    <div className="
                        rounded-full
                        mt-6
                        mb-1
                        w-32
                        h-32
                        bg-gray-100"
                    />
                }
                <div
                    className="
                    text-white
                    font-bold
                    bg-black
                    w-full
                    text-center"
                >
                    { data?.name }
                </div>
                <div
                    className="text-white text-xs bg-black w-full text-center"
                >
                    { data?.title }
                </div>
                <Icons
                    className="text-white mt-2 flex"
                    logosClass="mx-2"
                    logos={data?.logos}
                />
            </div>
            <div className="bg-red-500 w-2/3 h-full text-white p-8">
                <div className="mt-12">
                    <div
                        className="font-semibold bg-red-500"
                    >
                        { data?.about }
                    </div>
                    <div
                        className="text-sm pl-2 w-full h-40 bg-red-500 resize-none"
                    >
                        { data.desc }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardOneEdit;
