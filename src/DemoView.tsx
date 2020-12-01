import React from 'react';
import {fetchDemo, fetchWithErrorDemo, useDemo} from "./providers/DemoProvider";
import {Box, Button, Grid, Typography} from "@material-ui/core";

const DemoView: React.FC = () => {
  const [state, dispatch] = useDemo()

  return (
    <Box flexGrow p={20}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Provider Pattern</Typography>
        </Grid>
        <Grid item xs={6}> <Typography>Fetching:</Typography> </Grid>
        <Grid item xs={6}><Typography>{state.fetching ? 'true' : 'false'}</Typography></Grid>
        <Grid item xs={6}> <Typography>Fetched:</Typography> </Grid>
        <Grid item xs={6}><Typography>{state.fetched ? 'true' : 'false'}</Typography></Grid>
        <Grid item xs={6}> <Typography>Result:</Typography> </Grid>
        <Grid item xs={6}><Typography>{state.result}</Typography></Grid>
        <Grid item xs={6}> <Typography>Error:</Typography> </Grid>
        <Grid item xs={6}><Typography>{state.error}</Typography></Grid>
        <Grid item>
          <Button color="primary" variant="contained" onClick={() => fetchDemo(dispatch)}>Fetch Success</Button>
        </Grid>
        <Grid item>
          <Button color="secondary" variant="contained" onClick={() => fetchWithErrorDemo(dispatch)}>Fetch Fail</Button>
        </Grid>
      </Grid>
    </Box>)
};

export default DemoView;
