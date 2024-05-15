import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Grid, Typography, Stack, TableContainer, TableHead, TableRow, TableCell, TableBody, Table, Skeleton, Button } from '@mui/material'
import axios from 'axios'
import '../forecast.css'
export function ForecastInfo() {
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const { location, date, i } = useParams()
    const [locationData, setLocationData] = useState([])
    const [forecastData, setForecastData] = useState([])
    const [hourlyData, setHourlyData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    useEffect(() => {
        getForecastInfo()
        nextDayButton()
        prevDayButton()
        console.log('updating')
    }, [date, i])
    const nextDayButton = () => {
        if (i === '6') {
            return (
                <Button variant="outlined" disabled className="next-button">Next</Button>
            )
        } else {
            var day = new Date(date);
            var nextDay = new Date(date);
            nextDay.setDate(day.getDate() + 1);
            const formattedDate = `${nextDay.getFullYear()}-${nextDay.getMonth() + 1}-${nextDay.getDate()}`
            const index = parseInt(i) + 1
            return (
                <Link to={`/${locationData.name}/${formattedDate}/${index}`}>
                    <Button variant="outlined" className="next-button">Next day</Button>
                </Link>
            )
        }
    }
    const prevDayButton = () => {
        if (i === '0') {
            return (
                <Button variant="outlined" disabled className="prev-button">Previous Day</Button>
            )
        } else {
            var day = new Date(date);
            var nextDay = new Date(date);
            nextDay.setDate(day.getDate() - 1);
            const formattedDate = `${nextDay.getFullYear()}-${nextDay.getMonth() + 1}-${nextDay.getDate()}`
            const index = parseInt(i) - 1
            return (
                <Link to={`/${locationData.name}/${formattedDate}/${index}`}>
                    <Button variant="outlined" className="prev-button">Previous Day</Button>
                </Link>
            )
        }
    }

    const getForecastInfo = async () => {
        const days = i + 1;
<<<<<<< HEAD
        await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=96bc267963404f3e9c1180001240105&q=${location}&days=${days}&aqi=yes&alerts=yes`)
=======
        await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=""&q=${location}&days=${days}&aqi=yes&alerts=yes`)
>>>>>>> 3d9f0edbf25cf561184b3661b572f1a737f464fe
            .then((res) => {
                setLocationData(res.data.location)
                setForecastData(res.data.forecast.forecastday[i])
                const data = res.data.forecast.forecastday[i].hour
                const hourlyDataArr = []
                for (let i = 0; i < 8; i++) {
                    hourlyDataArr.push(data[3 * i])
                }
                setLoading(true)
                setHourlyData(hourlyDataArr)
            })
    }
    if(!forecastData) {
        return (
            window.location.href = '/404.jsx'
        )
    }
    return (
        <div className="container">
            <Grid sx={{ width: { xs: '90%', md: '80%' }, margin: 'auto', direction: { xs: 'column', md: 'row' } }}>
                <Typography className="forecast-title">World Weather Info</Typography>
                {isLoading ? (
                    <div>
                        <Stack direction={{ xs: 'column', md: 'row' }}>
                            <Grid item width={{ xs: '100%', md: '100%' }} container direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'center' }} justifyContent={{ xs: 'center' }}>
                                <Grid item md={6} xs={6} textAlign={{ xs: 'center', md: 'left' }}>
                                    <Typography variant="h3">
                                        {locationData.name},
                                    </Typography>
                                    <Typography variant="h6">
                                        {locationData.region}
                                    </Typography>
                                    <Typography marginBottom={3}>
                                        {weekday[new Date(date).getDay()]}, {new Date(date).getDate()} {month[new Date(date).getMonth()]} {new Date(date).getFullYear()}
                                    </Typography>
                                </Grid>
                                <Grid item md={6} xs={6} textAlign={{ xs: 'center', md: 'left' }}>
                                    <Typography variant="h3">
                                        {forecastData.day.avgtemp_c}°C
                                    </Typography>
                                    <Typography variant="h5">
                                        {forecastData.day.condition.text}
                                    </Typography>
                                </Grid>
                                <Grid item container marginTop={{ xs: '15px' }} spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="h5">
                                            Min temp
                                        </Typography>
                                        <Typography variant="h4">
                                            {forecastData.day.mintemp_c}°C
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h5">
                                            Max temp
                                        </Typography>
                                        <Typography variant="h4">
                                            {forecastData.day.maxtemp_c}°C
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h5">
                                            Humidity
                                        </Typography>
                                        <Typography variant="h4">
                                            {forecastData.day.avghumidity}%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h5">
                                            Wind speed (kph)
                                        </Typography>
                                        <Typography variant="h4">
                                            {forecastData.day.maxwind_kph}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h5">
                                            Sunrise
                                        </Typography>
                                        <Typography variant="h4">
                                            {forecastData.astro.sunrise}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h5">
                                            Sunset
                                        </Typography>
                                        <Typography variant="h4">
                                            {forecastData.astro.sunset}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item width={{ xs: '100%', md: '55%' }}>
                                <Typography className="table-header">
                                    3 Hourly Forecast
                                </Typography>
                                <TableContainer className="table" component={Grid}>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableCell><Typography className="table-head">Time</Typography></TableCell>
                                            <TableCell><Typography className="table-head">Temp</Typography></TableCell>
                                            <TableCell><Typography className="table-head">Condition</Typography></TableCell>
                                            <TableCell><Typography className="table-head">Humidity</Typography></TableCell>
                                        </TableHead>
                                        <TableBody>
                                            {hourlyData.map((res) => (
                                                <TableRow>
                                                    <TableCell>
                                                        <Typography className="table-data">
                                                            {new Date(res.time).getHours()} : {new Date(res.time).getMinutes()}0
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography className="table-data">
                                                            {res.temp_c} °C
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Stack direction='row' alignItems='center'>
                                                            <img src={res.condition.icon} alt={res.time_epoch} />
                                                            <Typography className="table-data">
                                                                {res.condition.text}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography className="table-data">
                                                            {res.humidity} %
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Stack>
                        <Grid item className="button-group">
                            {nextDayButton()}
                            {prevDayButton()}
                            <div className="home-button">
                                <Button variant="outlined" href="/">Home</Button>
                            </div>
                        </Grid>
                    </div>
                ) : (
                    <div>
                        <Skeleton
                            variant='rounded'
                            animation='wave'
                            width='100%'
                            height={50}
                        />
                    </div>
                )}

            </Grid>
        </div>
    )
}
