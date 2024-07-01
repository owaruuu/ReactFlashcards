import { useStopwatch } from "react-timer-hook";
import { useState, useEffect } from "react";

const TestTimer = (props) => {
    const { stopTimer } = props;
    const { totalSeconds, seconds, minutes, hours, pause } = useStopwatch({
        autoStart: true,
    });

    const [overtime, setOvertime] = useState(false);
    useEffect(() => {
        if (hours > 0) {
            setOvertime(true);
            pause();
        }
    }, [hours]);

    useEffect(() => {
        if (props.stopTimer) {
            props.updateTime({
                totalSeconds,
                seconds,
                minutes,
                hours,
            });
            pause();
        }
    }, [stopTimer]);

    const pad = (number) => {
        return number.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
    };

    const timerText = overtime ? (
        "Timer detenido"
    ) : (
        <span>
            <span>{pad(hours)}</span>:<span>{pad(minutes)}</span>:
            <span>{pad(seconds)}</span>
        </span>
    );

    return (
        <span style={{ textAlign: "end", color: "white" }}>
            <span>{timerText}</span>
        </span>
    );
};

export default TestTimer;
