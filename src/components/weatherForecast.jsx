import { useEffect, useState } from 'react'
import { Grid, Typography, Card, CardContent, CardMedia, Box, TableContainer, TableRow, Table, TableCell, TableHead, Skeleton, CardActionArea } from '@mui/material'

export function WeatherForecast() {
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [location, setLocation] = useState([])
    const [data, setData] = useState([])
    const [forecastData, setForecastData] = useState([])
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        getLocation()
        fetchWeekForecast()
        famousCityData()
    }, [location])
    const getLocation = () => {
        document.getElementById('searchBar').addEventListener('keypress', (x) => {
            if (x.key === 'Enter') {
                setLocation(x.target.value.toLowerCase())
                fetchWeekForecast(x.target.value.toLowerCase())
            }
        })
    }
    const famousCityData = () => {
        document.getElementById('card').addEventListener('click', (e) => {
          const search = e.srcElement.innerText
          setLocation(search);
          fetchWeekForecast(search);
        })
      }
    if (!location) return;
    const fetchWeekForecast = async (location) => {
        const forecastDataArr = []
        if (!location) return;
        const result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=""&q=${location}&days=7&aqi=no&alerts=no`)
        result.json()
            .then((json) => {
                const forecastData = json.forecast.forecastday
                forecastData.map((res) => {
                    forecastDataArr.push({
                        avgtemp: res.day.avgtemp_c,
                        date: res.date,
                        day: weekday[new Date(res.date).getDay()],
                        icon: res.day.condition.icon,
                        text: res.day.condition.text,
                    })
                })
                setForecastData(forecastDataArr)
                setLoading(true)
            }).catch((err) => {
                console.log(err)
                setLocation([])
                setForecastData([])
                setData([])
            })
    }
    let max = data[0]

    for (let i = 0; i < data.length; i++) {
        if (data[i] < max) {
            max = data[i]
        }
    }
    if (location.length === 0) return;
    return (
        <div>
            <Grid container
                width='80%'
                margin='auto'
                borderRadius='15px'
            >
                <Grid item container marginTop={2} marginLeft={1}>
                    <Typography variant='h4'>
                        Weekly Forecast
                    </Typography>
                </Grid>
                {isLoading ? (
                    <Grid item container sx={4} marginBottom={3}>
                        <TableContainer component={Grid}>
                            <Table>
                                <TableHead>
                                    <TableRow >
                                        {forecastData.map((res, i) => (
                                            <TableCell width='140px' height='200' sx={{ padding: '0.5%' }}>
                                                <Card sx={{ borderRadius: '15px', borderColor: 'black', border: 1, bgcolor: '#ebebeb' }}>
                                                    <CardActionArea href={`/${location}/${res.date}/${i}`}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <CardContent sx={{ boxShadow: 0 }}>
                                                            <Typography sx={{ typography: { xs: 'h4', md: 'h6' } }}>
                                                                {res.day}
                                                            </Typography>
                                                            <Typography sx={{ typography: { xs: 'h5', md: 'body1' } }}>
                                                                {new Date(res.date).getDate()}/{new Date(res.date).getMonth() + 1}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardMedia
                                                            src={res.icon}
                                                            component='img'
                                                            sx={{ maxWidth: '60%', alignItems: 'center' }}
                                                        />
                                                        <CardContent sx={{ textAlign: 'center' }}>
                                                            <Typography fontSize={30}>
                                                                {res.avgtemp}°C
                                                            </Typography>
                                                            <Typography fontSize={12}>
                                                                24hr Avg.
                                                            </Typography>
                                                        </CardContent>
                                                    </Box>
                                                    </CardActionArea>
                                                </Card>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Grid>
                ) : (

                    <Skeleton
                        variant='rounded'
                        animation='wave'
                        width='100%'
                        height={50}
                    />
                )}
            </Grid>
        </div>

    )
}
