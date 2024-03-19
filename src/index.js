import express from "express"
import path from 'path';
import { fileURLToPath } from 'url';
import applicationTest from "./01-application.js";
import basicRouting from "./02-request.js";
import reqQueryParam from "./03-request_query_param.js";
import reqHeader from "./04-req_header.js";
import resStatus from "./05-res_status.js";
import resHeader from "./06-res_header.js";
import resBody from "./07-res_body.js";
import redirectTest from "./08-redirect.js";
import { middleware1, middleware2 } from "./09-middleware.js";
import routeParam from "./10-route_param.js";
import cookieParser from "cookie-parser";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.get('/application', (req, res) => {
    applicationTest(req, res)
})

app.all('/basic-routing', (req, res) => {
    basicRouting(req, res)
})

app.get('/req-query-param', (req, res) => {
    reqQueryParam(req, res)
})

app.get('/req-header', (req, res) => {
    reqHeader(req, res)
})

app.get('/res-status', (req, res) => {
    resStatus(req, res)
})

app.get('/res-header', (req, res) => {
    resHeader(req, res)
})

app.get('/res-body', (req, res) => {
    resBody(req, res)
})

app.get('/redirect', (req, res) => {
    redirectTest(req, res)
})

// Middleware
app.use(middleware1)
app.use(middleware2)
app.get('/middleware', (req, res) => {
    res.send('hello middleware')
})

app.get('/route-param/:id', (req, res) => {
    routeParam(req, res)
})

app.route('/route-func')
    .get((req, res) => {
        res.send(`ini route function dengan method ${req.method}`)
    })
    .post((req, res) => {
        res.send(`ini route function dengan method ${req.method}`)
    })

// Router
const router = express.Router()

router.use((req, res, next) => {
    console.info("middleware")
    next()
})

router.get('/router', (req, res) => {
    res.send("test")
})

// Request Body
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.post('/request-body', (req, res) => {
    const name = req.body.name
    res.json(name)
})
app.use(router)

// cookie
app.use(cookieParser("SECRETKEYRAHASIA"))
app.get('/cookie', (req, res) => {
    res.cookie('cookie2', 'test', {path:'/', signed:true})

    res.json({
        cookie1 : req.cookies['Cookie_2'],
        cookie2 : req.signedCookies['cookie2']
    })
})

// error handling middleware
const errorHandling = (err, req, res, next) => {
    res.status(500).send("error cuy")
}
app.get('/error', (req,res) => {
    throw new Error
})
app.use(errorHandling)

// static file
app.use("/static-file", express.static(__dirname))

// file upload
// app.use()

// not found
app.use((req, res) => {
    res.status(404).send("ga nemu cuy")
})

app.listen(3000, () => {
    console.info(`running on port 3000`)
})