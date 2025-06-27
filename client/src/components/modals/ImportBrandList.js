import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form, Spinner } from "react-bootstrap";
import * as XLSX from "xlsx";
import { createBrand, fetchTypes, createTypeBrand } from "../../http/productAPI";

const ImportBrandList = ({ show, onHide }) => {
    const [file, setFile] = useState(null);
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show) {
            fetchTypes().then(data => setTypes(data));
        }
    }, [show]);

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const processFile = async () => {
        if (!file) {
            alert("Пожалуйста, выберите файл!");
            return;
        }
        if (!window.confirm("Вы уверены, что хотите импортировать бренды из EXCEL?")) return;

        setLoading(true);

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                const promises = [];
                for (const row of jsonData) {
                    let typeId = row.type;
                    if (isNaN(Number(typeId))) {
                        const foundType = types.find(
                            t => t.name.toLowerCase() === String(row.type).toLowerCase()
                        );
                        typeId = foundType ? foundType.id : null;
                    }
                    if (row.name && typeId) {
                        // Сохраняем промис, а не ждём его завершения
                        promises.push(
                            createBrand({ name: row.name }).then(brand => {
                                if (brand && brand.id) {
                                    return createTypeBrand({ brandId: brand.id, typeId });
                                }
                            })
                        );
                    }
                }
                await Promise.all(promises);

                alert("Бренды успешно импортированы!");
                setFile(null);
                onHide();
            } catch (err) {
                alert("Ошибка при импорте: " + err.message);
            } finally {
                setLoading(false);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Импорт брендов
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Загрузите XLSX файл</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".xlsx"
                            onChange={handleFileUpload}
                        />
                    </Form.Group>
                </Form>
                {loading && <Spinner animation="border" className="mt-3" />}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={processFile} disabled={loading}>
                    Импорт
                </Button>
                <Button variant="outline-danger" onClick={onHide} disabled={loading}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ImportBrandList;