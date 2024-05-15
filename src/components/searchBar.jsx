import { Typography, Input, Box, Stack, Grid, Card, CardContent } from "@mui/material";
import { Search } from '@mui/icons-material'
import React from "react";
import cities from '../famousCities.json'

export function SearchBar() {
    return (
        <div>
            <Typography variant="h2" align="center">
                World Weather Info
            </Typography>
            <Box className="search-bar" sx={{ width: { xs: '65%', md: '35%' }, margin: 'auto', padding: 1 }}>
                <Stack direction='row' alignItems='center' spacing={1}>
                    <Search sx={{ paddingLeft: 0.5, fontSize: 30 }}/>
                    <Input placeholder="Find your city" id="searchBar" type="text" className="search" sx={{ width: { xs: '100%', md: '100%' } }} disableUnderline/>
                </Stack>
            </Box>
            <Grid container spacing={2} justifyContent="center" marginTop={1} width='100%' id="card">
                {cities.map((res) => (
                    <Grid item>
                        <Card sx={{ background: `url(${res.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', width: '150px', backgroundPositionY: -17, borderColor: 'black', border: 1 }}>
                            <CardContent>
                                <Typography textAlign='center' color='white' className="famous-city">
                                    {res.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}