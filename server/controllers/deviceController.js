const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }

    async importDevices(req, res, next) {
        try {
            const { devices } = req.body; // Array of devices from the frontend
            const files = req.files; // Uploaded image files

            const createdDevices = [];

            for (const device of devices) {
                const { name, price, brandId, typeId, info, img } = device;

                // Handle image upload
                let fileName = null;
                if (files && files[img]) {
                    fileName = uuid.v4() + ".jpg";
                    files[img].mv(path.resolve(__dirname, '..', 'static', fileName));
                }

                // Create the device
                const createdDevice = await Device.create({
                    name,
                    price,
                    brandId,
                    typeId,
                    img: fileName
                });

                // Handle device info
                if (info) {
                    const parsedInfo = JSON.parse(info);
                    for (const i of parsedInfo) {
                        await DeviceInfo.create({
                            title: i.title,
                            description: i.description,
                            deviceId: createdDevice.id
                        });
                    }
                }

                createdDevices.push(createdDevice);
            }

            return res.json({ message: "Devices imported successfully", devices: createdDevices });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new DeviceController()
