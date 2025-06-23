const { prisma } = require('../db');
const ApiError = require('../error/ApiError');

class TypeBrandController {
    async create(req, res, next) {
        try {
            const { typeId, brandId } = req.body;
            const typeBrand = await prisma.typeBrand.create({
                data: {
                    typeId: Number(typeId),
                    brandId: Number(brandId)
                }
            });
            return res.json(typeBrand);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const typeBrands = await prisma.typeBrand.findMany();
            return res.json(typeBrands);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new TypeBrandController();
