const uuid = require('uuid');
const path = require('path');
const { prisma } = require('../db');
const ApiError = require('../error/ApiError');

class ProductController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const product = await prisma.product.create({
                data: {
                    name,
                    price: Number(price),
                    brandId: Number(brandId),
                    typeId: Number(typeId),
                    img: fileName,
                    product_infos: info
                        ? {
                            create: JSON.parse(info).map(i => ({
                                title: i.title,
                                description: i.description
                            }))
                        }
                        : undefined
                }
            });

            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query;
        page = Number(page) || 1;
        limit = Number(limit) || 9;
        let offset = (page - 1) * limit;

        let where = {};
        if (brandId) where.brandId = Number(brandId);
        if (typeId) where.typeId = Number(typeId);

        const [products, count] = await Promise.all([
            prisma.product.findMany({
                where,
                skip: offset,
                take: limit
            }),
            prisma.product.count({ where })
        ]);

        return res.json({ rows: products, count });
    }

    async getOne(req, res) {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
            include: { product_infos: true }
        });
        return res.json(product);
    }

    async importProducts(req, res, next) {
        try {
            const { products } = req.body; // Array of products from the frontend
            const files = req.files; // Uploaded image files

            const createdProducts = [];

            for (const product of products) {
                const { name, price, brandId, typeId, info, img } = product;

                // Handle image upload
                let fileName = null;
                if (files && files[img]) {
                    fileName = uuid.v4() + ".jpg";
                    files[img].mv(path.resolve(__dirname, '..', 'static', fileName));
                }

                // Create the product
                const createdProduct = await prisma.product.create({
                    data: {
                        name,
                        price: Number(price),
                        brandId: Number(brandId),
                        typeId: Number(typeId),
                        img: fileName,
                        product_infos: info
                            ? {
                                create: JSON.parse(info).map(i => ({
                                    title: i.title,
                                    description: i.description
                                }))
                            }
                            : undefined
                    }
                });

                createdProducts.push(createdProduct);
            }

            return res.json({ message: "Products imported successfully", products: createdProducts });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ProductController();