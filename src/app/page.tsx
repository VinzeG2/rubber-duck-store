'use client'

import { mockDucks } from "@/data/ducks";
import { Button, Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddDuckModal from "@/components/AddDuckModal";
import { NewDuck } from "@/types/duck";


export default function Home() {

  const getSortedDucks = useMemo(() => [...mockDucks].sort((a, b) => b.stock - a.stock),[]) 
  const [ducks, setDucks] = useState(getSortedDucks);
  const [isAddDuckModalOpen, setIsAddDuckModalOpen] = useState(false)

  const fetchDucks = async () => {
    const res = await fetch("http://localhost:4000/ducks")
    const data = await res.json()
    console.log(data);
    setDucks(data.sort((a: { stock: number; }, b: { stock: number; }) => b.stock - a.stock));
  }

  useEffect(() => {
    fetchDucks()
  }, [])
  

  const handleAddDuck = () => setIsAddDuckModalOpen(true);

  const handleEditDuck = (id:number) => { 
    console.log(`Editando Pato ${id}`);
  }

  const handleDeleteDuck = (id:number) => { 
    setDucks(prev => 
      prev.filter(duck => duck.id !== id).sort((a,b) => b.stock - a.stock)
    )
  }

  const handleSubmitDuck = async (newDuck: NewDuck) => {
    console.log({newDuck});
    
    await fetch("http://localhost:4000/ducks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDuck)
    })
    fetchDucks()
  }


  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        Almacen de Patitos
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleAddDuck}>
        Agregar Pato
      </Button>

      <AddDuckModal 
        open={isAddDuckModalOpen}
        onClose={() => setIsAddDuckModalOpen(false)}
        onSubmit={handleSubmitDuck}
      />

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
