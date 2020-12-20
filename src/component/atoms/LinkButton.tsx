import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import React, {PropsWithChildren} from "react";
import {styled} from "@material-ui/core";

const ExternalButton = styled(Button)({
    borderRadius: '100px',
    textTransform: 'none',
    padding: '8px 32px',
    backgroundColor: '#3f51b50f',
    marginTop: '8px',
    marginBottom: '16px',
})

interface LinkButtonProps {
    link?: string,
    startIcon?: React.ReactNode
}

export default function LinkButton({link, startIcon, children, ...props}: PropsWithChildren<LinkButtonProps>) {
    return (
        <React.Fragment>
            <Link href={link} underline="none" rel={"noopener"} target={"_blank"} {...props}>
                <ExternalButton startIcon={startIcon}>{children}</ExternalButton>
            </Link>
        </React.Fragment>
    );
}
