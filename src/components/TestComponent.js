import { useEffect, useState } from "react";
import { readFromLocal, writeToLocal } from "../utils/utils";
import axios from "axios";

const TestComponent = () => {
    const [currentProgress, setCurrentProgress] = useState(() =>
        readFromLocal("currentProgress")
    );
    const [timeSinceLastSave, setTimeSinceLastSave] = useState(0);
    const [saveText, setSaveText] = useState("");

    const api = axios.create({
        withCredentials: true, // Include credentials (cookies) in the request
    });

    const updateCounter = () => {
        setTimeSinceLastSave((lastTime) => lastTime + 1);
        // console.log("updated counter");
    };

    const autosaveDelay = 1;

    const saveToCloud = () => {
        console.log("saving to cloud");
        console.log("checking progress to then save to cloud");
        console.log("time since last save to cloud ", timeSinceLastSave);

        const saveResponse = async () => {
            const response = await api.get("http://localhost:3003/save");
            return response;
        };

        //check timer
        if (timeSinceLastSave > autosaveDelay) {
            console.log(
                `the time since last save to cloud is higher that ${autosaveDelay}, attempting to save to cloud`
            );

            setSaveText("saving to cloud...");
            saveResponse()
                .then((res) => {
                    console.log("response after axios await", res);
                    setSaveText("saved to cloud.");
                })
                .catch((err) => {
                    console.log(err);
                    setSaveText("error saving to cloud...");
                });

            setTimeSinceLastSave(0);
        } else {
            console.warn("too soon to attempt to save to cloud");
        }
    };

    useEffect(() => {
        const interval = setInterval(updateCounter, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(
        () => writeToLocal("currentProgress", currentProgress),
        [currentProgress]
    );

    useEffect(saveToCloud, [currentProgress]);

    const handleChange = (id) => {
        //Si el key existe, intercambiar valor
        if (currentProgress.hasOwnProperty(id)) {
            setCurrentProgress({
                ...currentProgress,

                [id]: !currentProgress[id],
            });
        } else {
            //else, crear un key y valor true
            setCurrentProgress({
                ...currentProgress,

                [id]: true,
            });
        }
    };

    return (
        <>
            <div>{saveText && <span>{saveText}</span>}</div>
            <div className="timer">
                Time since last autosave attempt: {timeSinceLastSave}
            </div>
            <div className="content">
                <div>
                    <label className="label">Primera opcion</label>
                    <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() => handleChange(1)}
                        id={1}
                        checked={currentProgress[1] || false}
                    />
                </div>
                <div>
                    <label className="label">Segunda opcion</label>
                    <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() => handleChange(2)}
                        id={2}
                        checked={currentProgress[2] || false}
                    />
                </div>
            </div>
        </>
    );
};

export default TestComponent;
