const { prisma } = require('../db');
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const brand = await prisma.brand.create({
                data: { name }
            });
            return res.json(brand);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await prisma.brand.findMany({
                include: { typeBrands: true }
            });
            return res.json(brands);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new BrandController()
