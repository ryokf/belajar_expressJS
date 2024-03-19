export default function resStatus(req, res) {
    if (req.query.name) {
        res.send(`hello ${ req.query.name }`)
    } else {
        res.status(404).send("not found")
    }
}