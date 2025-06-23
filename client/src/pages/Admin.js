import React, { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import CreateBrandModal from "../components/modals/CreateBrand";
import CreateProductModal from "../components/modals/CreateProduct";
import CreateTypeModal from "../components/modals/CreateType";
import ImportPriceListModal from "../components/modals/ImportPriceList";
import ImportTypeListModal from "../components/modals/ImportTypeList";
import ImportBrandListModal from "../components/modals/ImportBrandList";

const Admin = () => {
    const [modal, setModal] = useState({
        typeCreate: false,
        typeImport: false,
        brandCreate: false,
        productCreate: false,
        priceImport: false,
    });

    const openModal = (name) => setModal(prev => ({ ...prev, [name]: true }));
    const closeModal = (name) => setModal(prev => ({ ...prev, [name]: false }));

    return (
        <Container className="d-flex flex-column align-items-center">
            <div style={{ maxWidth: 400, width: "100%" }}>
                <div className="d-flex gap-3 mt-4 mb-2">
                    <Button
                        variant="outline-dark"
                        className="p-2 w-100"
                        onClick={() => openModal('typeCreate')}
                    >
                        Добавить тип
                    </Button>
                    <Button
                        variant="outline-secondary"
                        className="p-2 w-100"
                        onClick={() => openModal('typeImport')}
                    >
                        Загрузить типы
                    </Button>
                </div>
                <div className="d-flex gap-3 mt-4 mb-2">
                    <Button
                        variant="outline-dark"
                        className="p-2 w-100"
                        onClick={() => openModal('brandCreate')}
                    >
                        Добавить бренд
                    </Button>
                    <Button
                        variant="outline-secondary"
                        className="p-2 w-100"
                        onClick={() => openModal('brandImport')}
                    >
                        Загрузить бренды 
                    </Button>
                </div>
                <Button
                    variant="outline-dark"
                    className="mb-2 p-2 w-100"
                    onClick={() => openModal('productCreate')}
                >
                    Добавить устройство
                </Button>
                <Button
                    variant="outline-danger"
                    className="mb-2 p-2 w-100"
                    onClick={() => openModal('priceImport')}
                >
                    Загрузить прайс
                </Button>
            </div>
            <CreateTypeModal show={modal.typeCreate} onHide={() => closeModal('typeCreate')} />
            <ImportTypeListModal show={modal.typeImport} onHide={() => closeModal('typeImport')} />
            <CreateBrandModal show={modal.brandCreate} onHide={() => closeModal('brandCreate')} />
            <ImportBrandListModal show={modal.brandImport} onHide={() => closeModal('brandImport')} />
            <CreateProductModal show={modal.productCreate} onHide={() => closeModal('productCreate')} />
            <ImportPriceListModal show={modal.priceImport} onHide={() => closeModal('priceImport')} />
        </Container>
    );
};

export default Admin;