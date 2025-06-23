const { prisma } = require('../db')
const ApiError = require('../error/ApiError');

class UnitController {
    async create(req, res, next) {
        try {
            const { name } = req.body
            const type = await prisma.unit.create({
                data: { name }
            })
            return res.json(type)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const types = await prisma.unit.findMany()
            return res.json(types)
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

}

module.exports = new TypeController()