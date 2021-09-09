const Card = ({ data }) => {
    console.log(data)
    return (
        <h1>Hello World!</h1>
    )
}

Card.getInitialProps = async (ctx) => {
    const data = ctx.query
    return { data }
}

export default Card;
