import { Grid, Card, CardHeader, CardContent } from "@mui/material";
import { Layout } from "@/components/layouts";
import { EntryList, NewEntry } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Layout title="home - OpenJira">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "calc(100vh - 100px )" }}>
              <CardHeader title="pendientes" />
                <NewEntry />
                <EntryList status="pending" />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "calc(100vh - 100px )" }}>
              <CardHeader title="En progeso" />
              <EntryList status="in-progress" />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "calc(100vh - 100px )" }}>
              <CardHeader title="Completadas" />
              <EntryList status="finished" />
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}
