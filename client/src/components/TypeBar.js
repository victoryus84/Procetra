import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <ListGroup>
                {/* Add "All Types" as the first element */}
                <ListGroup.Item
                    style={{ cursor: 'pointer' }}
                    active={!device.selectedType.id} // Active if no type is selected
                    onClick={() => device.setSelectedType({})} // Reset selected type
                    key="all-types"
                >
                    Общие
                </ListGroup.Item>

            {device.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={type.id === device.selectedType.id}
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;
