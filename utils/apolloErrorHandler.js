export default function apolloErrorHandler(error){
    const err = JSON.stringify(error, null, 2)
    const errObj = JSON.parse(err)
    return errObj.graphQLErrors[0]?.extensions.exception.data.message[0]?.messages[0]?.message;
}
