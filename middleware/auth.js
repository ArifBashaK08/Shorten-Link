import { getUser } from "../services/auth.js"

export const authenticateUser = (req, res, next) => {
    try {
        const authCookie = req.cookies?.uID

        req.user = null

        if (!authCookie) return next()

        const user = getUser(authCookie)

        if (!user) return res.status(401).send(`<h1>You are not Authorised</h1>
    <script>
    setTimeout(() => {
            window.location.href = "/signin"
        }, 1000)
    </script>`)

        req.user = user

        return next()
    } catch (error) {
        console.error(`Error : ${error.message}\n${error}`)
        return res.status(500).send(`<h1>Internal Server Error</h1>`)
    }
}

export const authorizeUser = (roles = []) => {
    return function (req, res, next) {
        try {
            if (!req.user) return res.status(401).send(`<h1>You are not Authorised</h1>
            <script>
            setTimeout(() => {
                window.location.href = "/signin"
            }, 1000)
            </script>`)

            if (!roles.includes(req.user.role)) return res.status(403).end(`<h1>Access Forbidden</h1>`)

            next()
        } catch (error) {
            console.error(`Error : ${error.message}\n${error}`)
            return res.status(500).send(`<h1>Internal Server Error</h1>`)
        }
    }
}