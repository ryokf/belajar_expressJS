export const middleware1 = (req, res, next) => {
    res.set("first-middleware", "pass 1")
    next()
}

export const middleware2 = (req, res, next) => {
    res.set("second-middleware", "pass 2")
    next()
}

