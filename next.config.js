module.exports = {
    async redirects() {
        return [
            {
                source: '/ballerz',
                destination: '/',
                permanent: true,
            },
        ]
    },
}
