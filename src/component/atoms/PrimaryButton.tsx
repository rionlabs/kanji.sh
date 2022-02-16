import React, { Props } from 'react';

export type ButtonProps = Props<HTMLButtonElement>;

const PrimaryButton: (props: ButtonProps) => JSX.Element = (props: ButtonProps) => (
    <button className="rounded-l-full rounded-r-full px-4 py-2 color-primary" {...props} />
);

export default PrimaryButton;
