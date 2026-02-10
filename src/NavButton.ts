import {Button, styled} from "@mui/material";

type Props = {
    background?: string
}

export const NavButton = styled(Button)<Props>(({background, theme}) => ({
    boxSizing: 'border-box',
    boxShadow: 'none',
    fontWeight: "bold",
    fontSize: "14px",
    color: 'black',
    textTransform: "uppercase",
    textDecoration: "none",
    "&:active": {
        color: "black"
    },
    background: background || theme.palette.primary.dark,
    margin: "10px",
    padding: "10px 15px",
}))
