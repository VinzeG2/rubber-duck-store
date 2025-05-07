import { Container, Typography } from "@mui/material";
import styles from "./page.module.css";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        Rubber Ducky Store
      </Typography>
    </Container>
  );
}
