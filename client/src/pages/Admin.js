import React, { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import ImportPriceList from "../components/modals/ImportPriceList"; // Import the ImportPriceList component

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [priceListVisible, setPriceListVisible] = useState(false); // State for ImportPriceList modal

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <Button
                variant={"outline-danger"}
                className="mt-4 p-2"
                onClick={() => setPriceListVisible(true)} // Open ImportPriceList modal
            >
                Загрузить прайс
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <ImportPriceList show={priceListVisible} onHide={() => setPriceListVisible(false)} /> {/* Add ImportPriceList modal */}
        </Container>
    );
};

export default Admin;