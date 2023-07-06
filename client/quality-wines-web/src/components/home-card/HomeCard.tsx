import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useLoginSession from '../../hooks/useLoginSession';
import { useNavigate } from 'react-router-dom';


const pages = [
    { label: 'Login', navigateTo: '/login', loggedNeeded: false },
    { label: 'Register', navigateTo: '/registry', loggedNeeded: false },
    { label: 'See measurements', navigateTo: '/measurements', loggedNeeded: true }];

export default function HomeCard() {
    const navigate = useNavigate();
    const [, , , , , isLogged] = useLoginSession();
    const handleClick = (navigateTo: string) => {
        navigate(navigateTo);
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Quality Wines
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    You can see measurements of the wines such as: Year, Variety, Type, Color,  Temperature, Graduation, and Ph
                </Typography>
            </CardContent>
            <CardActions>
                {isLogged && pages.filter(page => page.loggedNeeded).map((page) => (
                    <Button key={page.label} size="small" onClick={() => handleClick(page.navigateTo)}>{page.label}</Button>
                ))}
                {!isLogged && pages.filter(page => !page.loggedNeeded).map((page) => (
                    <Button key={page.label} size="small" onClick={() => handleClick(page.navigateTo)}>{page.label}</Button>
                ))}
            </CardActions>
        </Card>
    );
}