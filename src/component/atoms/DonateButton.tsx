import {ButtonProps, IconButton, IconButtonProps, styled} from "@material-ui/core";
import React, {PropsWithChildren} from "react";
import {logEvent} from "../../firebase";
import Config from "../../config/Config";
import Link from "@material-ui/core/Link";

const StyledButton = styled(IconButton)(({theme}) => ({
    alignSelf: "center",
    marginStart: theme.spacing(2),
    fontSize: 'bigger',
    padding: theme.spacing(2),
    color: "white"
}))

export default function DonateButton({...props}: IconButtonProps) {

    return (
        <Link href={Config.bmcUrl} target="_blank" rel="noopener" underline="none">
            <StyledButton
                onClick={() => logEvent('bmc_click')}
                aria-label="buy me a sushi" {...props}>
                <span role={"img"} aria-label={"Sushi Emoji"}>🍣</span>
            </StyledButton>
        </Link>
    );
}