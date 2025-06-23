import {$authHost, $host} from "./index";

// Type
export const createType = async (type) => {
    const {data} = await $authHost.post('api/v1/type', type)
    return data
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/v1/type')
    return data
}

// Brand
export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/v1/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const { data } = await $host.get('api/v1/brand')
    return data
}

// TypeBrand
export const createTypeBrand = async (typeBrand) => {
    const { data } = await $authHost.post('api/v1/typeBrand', typeBrand)
    return data
}

// Product
export const createProduct = async (product) => {
    const { data } = await $authHost.post('api/v1/product', product)
    return data
}

export const fetchProducts = async (typeId, brandId, page, limit= 5) => {
    const { data } = await $host.get('api/v1/product', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/v1/product/' + id)
    return data
}
