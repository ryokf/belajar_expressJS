export default function basicRouting(req, res) {
    res.json({
        data: "halo",
        path: req.path,
        originalUrl: req.originalUrl,
    })
}