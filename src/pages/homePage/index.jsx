/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom'; 

const HomePage = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Card>
        <CardContent style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '20px'}}>
          <Typography style={{margin: '20px'}} variant="h5" component="div" gutterBottom>
            Home Page
          </Typography>
          <Button style={{margin: '10px'}} variant="contained" color="primary" component={Link} to="/najmys-api">
            Najmy's API
          </Button>
          <Button style={{margin: '10px'}} variant="contained" color="primary" component={Link} to="/avicenas-api">
            Avicena's API
          </Button>
          <Button style={{margin: '10px'}} variant="contained" color="primary" component={Link} to="/deffis-api">
            Deffi's API
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default HomePage;
