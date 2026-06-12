import React from "react";
import Form from "react-bootstrap/Form";

const ToggleButton = ({ label, onChange, helperText, checked, disabled }) => {
    return (
        <Form.Check
            type="switch"
            id="my-switch"
            className="bookmarkToggle"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
        />
    );
};

export default ToggleButton;
