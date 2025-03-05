'use client'

import { ReactSVG } from "react-svg";

const Icon = ({ name, className }) => {
    return (
        <ReactSVG
            src={`/assets/icons/${name}.svg`}
            beforeInjection={(svg) => {
                svg.classList.add(...className.split(" "));
            }}
        />
    );
};

export default Icon;
