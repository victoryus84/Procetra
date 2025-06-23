import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import "../components/css/TypeBar.css"; 

const TypeBar = observer(() => {
    const {product} = useContext(Context)
    return (
        <ListGroup>
                {/* Add "All Types" as the first element */}
                <ListGroup.Item
                className="typebar-item"
                    style={{ cursor: 'pointer' }}
                    active={!product.selectedType.id} // Active if no type is selected
                    onClick={() => product.setSelectedType({})} // Reset selected type
                    key="all-types"
                >
                    Общие
                </ListGroup.Item>

            {product.types.map(type =>
                <ListGroup.Item
                    className="typebar-item"
                    style={{cursor: 'pointer'}}
                    active={type.id === product.selectedType.id}
                    onClick={() => product.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;
