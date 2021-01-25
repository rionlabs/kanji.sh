import { styled } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';

export type Space = number;

const StyledDiv = styled('div')((props: { theme: Theme } & { space?: Space }) => ({
    flex: 1,
    padding: props.theme.spacing(props.space || 1)
}));

export default function Spacer(props: { space?: Space }) {
    return <StyledDiv {...props} />;
}
