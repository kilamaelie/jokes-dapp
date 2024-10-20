import { Footer } from '@/common/components/footer';
import { MainContent } from '@/common/components/main';
import { NavBar } from '@/common/components/navbar';
import Grid from '@mui/material/Grid2';

export default function Home() {
  return (
    <Grid
      container
      direction='row'
      rowSpacing={{ xs: 2, sm: 4, md: 6 }}
      sx={{ margin: '20px 0px' }}
    >
      <NavBar />
      <Grid
        item
        size={{
          xs: 10,
          sm: 10,
          md: 8,
          xl: 6,
        }}
        sx={{ marginInline: 'auto', position: 'relative', height: '90vh' }}
        container
        direction='column'
        rowSpacing={{ xs: 2, sm: 4, md: 6 }}
      >
        <MainContent />
        <Footer />
      </Grid>
    </Grid>
  );
}
