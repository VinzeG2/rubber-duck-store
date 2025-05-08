'use client'

import { Duck, NewDuck } from "@/types/duck"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material"
import { useEffect, useState } from "react"

type AddDuckModalProps = {
    open: boolean
    onClose: () => void
    onSubmit: (newDuck: NewDuck) => void
    initialData?: NewDuck | Duck;
    isEdit?: boolean;
}

function AddDuckModal({ open, onClose, onSubmit, initialData, isEdit }: Readonly<AddDuckModalProps>) {

  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")

  useEffect(() => {
    if (initialData) {
      setColor(initialData.color);
      setSize(initialData.size);
      setPrice(String(initialData.price));
      setStock(String(initialData.stock));
    } else {
      setColor("");
      setSize("");
      setPrice("");
      setStock("");
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    if (!color || !size || !price || !stock) return
    onSubmit({
        color,
        size,
        price: parseFloat(price),
        stock: parseInt(stock)
    })
    onClose()
    setColor("")
    setSize("")
    setPrice("")
    setStock("")
  }

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Agregar nuevo Patito</DialogTitle>
        <DialogContent>
            <Stack spacing={2} mt={1}>
                <TextField label="Color" value={color} onChange={e => setColor(e.target.value)} />
                <TextField label="Tamaño" value={size} onChange={e => setSize(e.target.value)} />
                <TextField label="Precio" value={price} onChange={e => setPrice(e.target.value)} />
                <TextField label="Cantidad" value={stock} onChange={e => setStock(e.target.value)} />
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>cancelar</Button>
            <Button variant="contained" onClick={handleSubmit}>Agregar</Button>
        </DialogActions>
    </Dialog>
  )
}
export default AddDuckModal