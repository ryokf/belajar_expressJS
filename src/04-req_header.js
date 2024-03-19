export default function reqHeader(req, res) {
    res.send({
        Accept: req.get('Accept'),
        Authorization: req.get('Authorization')
    })
}