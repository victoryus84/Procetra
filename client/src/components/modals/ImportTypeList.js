import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form, Spinner } from "react-bootstrap";
import * as XLSX from "xlsx";
import { createType } from "../../http/productAPI"; // Импортируй функцию для создания типа

const ImportTypeList = ({ show, onHide }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const processFile = async () => {
        if (!file) {
            alert("Пожалуйста, выберите файл!");
            return;
        }
        if (!window.confirm("Вы уверены, что хотите импортировать типы из EXCEL?")) return;

        setLoading(true);

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                for (const row of jsonData) {
                    if (row.name) {
                        await createType({ name: row.name });
                    }
                }

                alert("Типы успешно импортированы!");
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
                    Импорт типов
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

export default ImportTypeList;