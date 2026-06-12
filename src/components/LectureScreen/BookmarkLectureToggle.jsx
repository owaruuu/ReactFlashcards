import React from "react";
import ToggleButton from "../ToggleButton";

const BookmarkLectureToggle = ({
    isBookmarked,
    onBookmarkClick,
    isLoading,
}) => {
    return (
        <>
            Marcar Leccion como Favorita
            <div className="bookmarkToggleContainer">
                {" "}
                <ToggleButton
                    // label="Toggle Me!"
                    onChange={onBookmarkClick}
                    isLoading={false}
                    checked={isBookmarked}
                    helperText="This is a helper text"
                    disabled={isLoading}
                    // disabled={true}
                />
                {isLoading ? "Modificando..." : ""}
            </div>
        </>
    );
};

export default BookmarkLectureToggle;
