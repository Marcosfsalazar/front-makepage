import Menu from "../../../components/Menu/Menu";
import Button from "../../../components/Button";
import CardOneEdit from "../../../components/Cards/CardOne/CardOneEdit";

const CardBuilder = ({ data }) => {
    const {username, id} = data;
    return(
        <div className="flex">
            <Menu username={ username }/>
            <main className="flex flex-col w-screen">
                <nav
                    className="
                        bg-white
                        w-full
                        flex
                        justify-center
                    "
                >
                    <Button className="m-2">Dashboard</Button>
                    <Button className="m-2">New Card</Button>
                </nav>
                <section className="w-full h-20 bg-gray-200 flex justify-center items-center">
                    <h1 className="font-bold text-xl">New Card</h1>
                </section>
                <section className="flex justify-center mt-12">
                    <CardOneEdit />
                </section>
            </main>
        </div>
    )
}

CardBuilder.getInitialProps = async (ctx) => {
    const data = ctx.query
    return { data }
}

CardBuilder.auth = true;
export default CardBuilder;
