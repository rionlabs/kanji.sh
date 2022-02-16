import React, { PropsWithChildren } from 'react';

interface LinkButtonProps {
    link?: string;
    startIcon?: React.ReactNode;
}

const LinkButton: ({
    link,
    startIcon,
    children,
    ...props
}: React.PropsWithChildren<LinkButtonProps>) => JSX.Element = ({
    link,
    startIcon,
    children,
    ...props
}: PropsWithChildren<LinkButtonProps>) => (
    <React.Fragment>
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a href={link} rel={'noopener'} target={'_blank'} {...props}>
            <button className="rounded-full py-8 px-32 my-8 mx-16">
                <span>{startIcon}</span>
                {children}
            </button>
        </a>
    </React.Fragment>
);

export default LinkButton;
