import React, { ReactNode } from 'react'
import { ButtonProps } from 'react-bootstrap'

interface Props {
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    children?: ReactNode;
}

const DefaultButton = (props: Props) => {
    const { className, type = 'button', children, onClick } = props;

    return (
        <button type={type} className={`primary-btn ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default DefaultButton
