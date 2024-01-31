import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { forEach } from "lodash";
const SearchBar = () => {
    const { lectures } = useContext(AppContext);
    const [value, setValue] = useState("");
    const [results, setResults] = useState([]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSearch = () => {
        if (value === "") {
            return;
        }

        const resultsArray = [];
        lectures.forEach((lecture) => {
            const lectureName = lecture.name;
            lecture.termList.forEach((term) => {
                if (term.answer.toLowerCase().includes(value.toLowerCase())) {
                    resultsArray.push({ name: lectureName, ...term });
                }
            });
        });

        setResults(resultsArray);
    };

    const handleClear = (event) => {
        setValue("");
        setResults([]);
    };

    const resultsElem = results.map((elem) => {
        return (
            <div className="resultElem">
                <div className="name">{elem.name}</div>
                <div className="term">{elem.term}</div>
                <div className="extra">{elem.extra}</div>
                <div className="answer">{elem.answer}</div>
            </div>
        );
    });

    return (
        <div className="searchBar">
            <div className="searchInput">
                <label>Busqueda Rapida: </label>
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                ></input>
                <button className="searchButton" onClick={handleSearch}>
                    Buscar
                </button>
                <button onClick={handleClear}>X</button>
            </div>
            <div className="resultList">{resultsElem}</div>
        </div>
    );
};

export default SearchBar;
