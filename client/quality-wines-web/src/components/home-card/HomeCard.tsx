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
                image="https://images.unsplash.com/photo-1556442281-77c90134c61f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                title="wine"
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