import React from "react";

const FormInfo = (props) => {
    const data = props.data;

    const messages = data.map((element, index) => (
        <p key={index}>{element.message}</p>
    ));

    return messages;
};

export default FormInfo;
