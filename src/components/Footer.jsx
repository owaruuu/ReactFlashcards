import React from "react";

const Footer = () => {
    const linkedin = (
        <span>
            © por{" "}
            <a
                href="https://www.linkedin.com/in/josuemarquez/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Josue Marquez
            </a>{" "}
            2023-2026.
        </span>
    );

    return <footer>{linkedin}</footer>;
};

export default Footer;
