import React from 'react';

export type CenterGridProps = {};

const CenterGrid: (props: CenterGridProps) => JSX.Element = (props: CenterGridProps) => (
    <div className="w-full text-center" {...props} />
);

export default CenterGrid;
