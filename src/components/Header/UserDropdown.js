import Dropdown from "react-bootstrap/Dropdown";

function UserDropdown(props) {
    const handleLogout = () => {
        console.log("log out");
    };

    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
                {props.username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default UserDropdown;
