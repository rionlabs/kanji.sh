import React from 'react';
import type { PropsWithChildren } from 'react';
import type { IconType } from 'react-icons';

interface LinkButtonProps {
    link?: string;
    startIcon?: IconType;
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
            <button className="button inline-flex items-center gap-4 px-12">
                <span className="opacity-80">
                    {startIcon && startIcon({ className: 'h-6 w-6' })}
                </span>
                {children}
            </button>
        </a>
    </React.Fragment>
);

export default LinkButton;
