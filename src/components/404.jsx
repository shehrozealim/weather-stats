import { Button, Typography } from "@mui/material"

export function PageNotFound() {
    return (
        <div>
            <Typography className="error" variant="h3">
                Invalid URL. Please try again.
            </Typography>
            <div className="home-button">
                <Button href="/" variant="outlined">home</Button>
            </div>
        </div>
    )
}