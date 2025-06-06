'use client'

import { mockDucks } from "@/data/ducks";
import { Button, Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddDuckModal from "@/components/AddDuckModal";
import { Duck, NewDuck } from "@/types/duck";


export default function Home() {

  const getSortedDucks = useMemo(() => [...mockDucks].sort((a, b) => b.stock - a.stock),[]) 
  const [ducks, setDucks] = useState(getSortedDucks);
  const [modalData, setModalData] = useState<NewDuck | Duck | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)



  const fetchDucks = async () => {
    const res = await fetch("http://localhost:4000/ducks")
    const data = await res.json()
    console.log(data);
    setDucks(data.sort((a: { stock: number; }, b: { stock: number; }) => b.stock - a.stock));
  }

  useEffect(() => {
    fetchDucks()
  }, [])
  

  const handleAddDuck = () => {
    setModalData(null);
    setIsEdit(false);
    setIsModalOpen(true);
  }

  const handleEditDuck = (id:number) => { 
    const duck = ducks.find(d => d.id === id)
    if (duck) {
      setModalData(duck);
      setIsEdit(true);
      setIsModalOpen(true);
    }
  }

  const handleDeleteDuck = async (id:number) => { 
    setDucks(prev => 
      prev.filter(duck => duck.id !== id).sort((a,b) => b.stock - a.stock)
    )

    try {
      await fetch(`http://localhost:4000/ducks/${id}`, {
        method: "DELETE",
      })
    } catch (error) {
      console.error("Failed to delete duck", error);
    }
   
  }

  const handleSubmitDuck = async (newDuck: NewDuck) => {
    console.log({newDuck});
    
    if (isEdit && modalData && 'id' in modalData) {
      await fetch(`http://localhost:4000/ducks/${modalData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDuck),
      });
    } else {
      await fetch("http://localhost:4000/ducks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDuck)
      })
    }
    setModalData(null)
    setIsModalOpen(false);
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
        open={modalData !== null || !isEdit && isModalOpen}
        onClose={() => {setModalData(null);setIsModalOpen(false);}}
        onSubmit={handleSubmitDuck}
        initialData={modalData ?? undefined}
        isEdit={isEdit}
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
