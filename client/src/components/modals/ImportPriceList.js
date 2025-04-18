import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import * as XLSX from "xlsx"; // Import the xlsx library
import { createDevice } from "../../http/deviceAPI"; // Adjust to your backend API

const ImportPriceList = ({ show, onHide }) => {
    const [file, setFile] = useState(null); // State to store the uploaded file

    // Handle file upload
    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
    };

    // Process the XLSX file
    const processFile = async () => {
        if (!file) {
            alert("Please upload a file first!");
            return;
        }

        // Show confirmation dialog
        const userConfirmed = window.confirm("Вы уверены, что хотите сделать импорт из EXCEL?");
        if (!userConfirmed) {
            return; // Exit if the user cancels
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0]; // Get the first sheet
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet); // Convert sheet to JSON

            console.log("Parsed Data:", jsonData);

            // Example: Send each row to the backend
            for (const row of jsonData) {
                if (row.name && row.price && row.brand && row.type) {
                    await createDevice({
                        name: row.name,
                        price: row.price,
                        brand: row.brand,
                        type: row.type,
                    }); // Adjust based on your backend API
                }
            }

            alert("Devices imported successfully!");
            setFile(null);
            onHide();
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Импорт устройств
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Upload XLSX File</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".xlsx"
                            onChange={handleFileUpload}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={processFile}>Импорт</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ImportPriceList;