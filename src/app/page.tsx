'use client'

import { mockDucks } from "@/data/ducks";
import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {

  const [ducks, setDucks] = useState(mockDucks);

  const handleAddDuck = () => { 
    console.log("Agregando Pato");
   }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        Almacen de Patitos
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleAddDuck}>
        Agregar Pato
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Tamaño</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ducks.map((duck)=>(
            <TableRow key={duck.id}>
              <TableCell>{duck.id}</TableCell>
              <TableCell>{duck.color}</TableCell>
              <TableCell>{duck.size}</TableCell>
              <TableCell>{duck.price}</TableCell>
              <TableCell>{duck.stock}</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
