import { ButtonProps, styled } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.spacing(16),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textTransform: 'none'
}));

const PrimaryButton: (props: ButtonProps) => JSX.Element = (props: ButtonProps) => (
    <StyledButton variant={'contained'} size={'large'} color={'primary'} {...props} />
);

export default PrimaryButton;
