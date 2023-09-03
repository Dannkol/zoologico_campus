import { Router } from 'express'

export const routes = Router()

routes.all('*', (req, res) => {
    res.status(404).json({
        message: `Version ${req.get('accept-version')} no encontrada`
    })
})
