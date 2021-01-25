import { GridProps, styled } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const StyledGrid = styled(Grid)(({ theme }) => ({
    textAlign: 'center'
}));

export default function CenterGrid(props: GridProps) {
    return <StyledGrid {...props} />;
}
