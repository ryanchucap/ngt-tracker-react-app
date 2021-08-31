import React, { useState } from "react";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";

import "./common.css";

const SortButton = (props) => {
    const size = "30px";

    const [active, setActive] = useState(0);

    const handleClick = (s) => {
        props.onChange(s);
        setActive(s);
    };

    return (
        <span className="container-sort">
            <BsFillCaretUpFill
                className={
                    active === 1 || props.deselected
                        ? "sort-always sort-inactive"
                        : "sort-always sort-active"
                }
                size={size}
                onClick={() => handleClick(-1)}
            />
            <BsFillCaretDownFill
                className={
                    active === -1 || props.deselected
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
