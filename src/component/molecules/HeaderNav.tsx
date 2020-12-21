import {useRouter} from 'next/router'
import {logEvent} from '../../firebase';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React from 'react';
import {LinkProps} from 'next/dist/client/link';
import {styled} from '@material-ui/core';

const StyledH6 = styled(Typography)(({theme}) => ({
    display: 'contents',
    alignSelf: 'center',
    userSelect: 'none',
    msUserSelect: 'none',
    fontWeight: 500,
    fontFamily: 'Quicksand, sans-serif',
    color: theme.palette.common.white,
    '&:after': {
        width: '100%',
        height: '6px',
        borderRadius: '6px',
        background: '#000'
    }
}));

const ActiveStyledH6 = styled(StyledH6)(({theme}) => ({
    color: theme.palette.common.white,
    fontWeight: 700,
}))

const StyledA = styled('a')(({theme}) => ({
    textTransform: 'none',
    textDecoration: 'none',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    cursor: 'pointer',
}));

interface HeaderNavProps extends React.PropsWithChildren<LinkProps> {
    eventPath: string
}

export function HeaderNav({eventPath, children, ...props}: HeaderNavProps) {
    const {asPath} = useRouter();
    const match = asPath.includes(props.href.toString())
    return (<Link {...props}>
        <StyledA onClick={() => logEvent('navigation', {path: eventPath})}>
            {
                match ?
                    (<ActiveStyledH6 variant="h6" noWrap>
                        {children}
                    </ActiveStyledH6>) :
                    (<StyledH6 variant="h6" noWrap>
                        {children}
                    </StyledH6>)
            }
        </StyledA>
    </Link>)
}
