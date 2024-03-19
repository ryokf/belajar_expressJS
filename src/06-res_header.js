export default function resHeader(req, res) {
    res.set({
        "X-Powered-By": 'awokawok',
        "X-Author": "ryo khrisna f"
    })

    res.send("oke")
}