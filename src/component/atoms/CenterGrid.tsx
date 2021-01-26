import { GridProps, styled } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';

const StyledGrid = styled(Grid)(() => ({
    textAlign: 'center'
}));

const CenterGrid: (props: GridProps) => JSX.Element = (props: GridProps) => (
    <StyledGrid {...props} />
);

export default CenterGrid;
