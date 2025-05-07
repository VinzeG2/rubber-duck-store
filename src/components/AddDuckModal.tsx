'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material"
import { useState } from "react"

type AddDuckModalProps = {
    open: boolean
    onClose: () => void
    onSubmit: (
        duck: {
            color: string,
            size: string,
            price: number,
            stock: number
        }
    ) => void
}

function AddDuckModal({ open, onClose, onSubmit }: Readonly<AddDuckModalProps>) {

  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")

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