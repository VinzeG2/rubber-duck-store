'use client'

import { mockDucks } from "@/data/ducks";
import { Button, Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Home() {

  const getSortedDucks = useMemo(() => [...mockDucks].sort((a, b) => b.stock - a.stock),[]) 
  const [ducks, setDucks] = useState(getSortedDucks);

  const handleAddDuck = () => { 
    console.log("Agregando Pato");
  }
  const handleEditDuck = (id:number) => { 
    console.log(`Editando Pato ${id}`);
  }
  const handleDeleteDuck = (id:number) => { 
    console.log(`Eliminando Pato ${id}`);
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
              <TableCell>
                <IconButton color="primary" onClick={() => handleEditDuck(duck.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="warning" onClick={() => handleDeleteDuck(duck.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
