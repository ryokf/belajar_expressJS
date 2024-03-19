export default function reqQueryParam(req, res) {
    res.send(`hello ${ req.query.firstName } ${ req.query.lastName }`)
}