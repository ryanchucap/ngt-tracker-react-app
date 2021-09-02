import React, { useState } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import "./common.css";

const SortButton = ({ deselected, onChange }) => {
    // toggle sort status depending on which arrow is clicked on
    // 0 -> neither selected
    // -1 -> up arrow selected
    // +1 -> down arrow selected
    const [active, setActive] = useState(0);

    const handleClick = (s) => {
        onChange(s);
        setActive(s);
    };

    const size = "30px";

    return (
        <span className="container-sort">
            <BsFillCaretUpFill
                className={
                    active === 1 || deselected
                        ? "sort-always sort-inactive"
                        : "sort-always sort-active"
                }
                size={size}
                onClick={() => handleClick(-1)}
            />
            <BsFillCaretDownFill
                className={
                    active === -1 || deselected
                        ? "sort-always sort-inactive"
                        : "sort-always sort-active"
                }
                size={size}
                onClick={() => handleClick(1)}
            />
        </span>
    );
};

export default SortButton;
