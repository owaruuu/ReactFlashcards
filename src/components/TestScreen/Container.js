import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./Container.module.css";

export const Container = forwardRef(
    (
        {
            children,
            columns = 1,
            handleProps,
            horizontal,
            hover,
            onClick,
            onRemove,
            label,
            placeholder,
            style,
            scrollable,
            shadow,
            unstyled,
            ...props
        },
        ref
    ) => {
        const Component = onClick ? "button" : "div";

        return (
            <Component
                {...props}
                ref={ref}
                style={{
                    ...style,
                    "--columns": columns,
                }}
                className={classNames(
                    "dropContainer",
                    styles.Container,
                    unstyled && styles.unstyled,
                    horizontal && styles.horizontal,
                    hover && styles.hover,
                    placeholder && styles.placeholder,
                    scrollable && styles.scrollable,
                    shadow && styles.shadow
                )}
                onClick={onClick}
                tabIndex={onClick ? 0 : undefined}
            >
                {label ? <div>{label}</div> : null}
                {<div className="optionsParent">{children}</div>}
            </Component>
        );
    }
);
