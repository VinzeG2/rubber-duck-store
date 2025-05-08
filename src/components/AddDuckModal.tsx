'use client'

import { Duck, NewDuck } from "@/types/duck"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
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
  const [size, setSize] = useState("Small")
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
      setSize("Small");
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
                <FormControl fullWidth>
                  <InputLabel id="color-label">Color</InputLabel>
                  <Select labelId="color-label" label="Color" value={color} onChange={e => setColor(e.target.value)}  >
                    <MenuItem value={"Rojo"}>Rojo</MenuItem>
                    <MenuItem value={"Verde"}>Verde</MenuItem>
                    <MenuItem value={"Amarillo"}>Amarillo</MenuItem>
                    <MenuItem value={"Negro"}>Negro</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="size-label">Tamaño</InputLabel>
                  <Select labelId="size-label" label="Tamaño" value={size} onChange={e => setSize(e.target.value)} >
                    <MenuItem value={"xlarge"}>XLarge</MenuItem>
                    <MenuItem value={"large"}>Large</MenuItem>
                    <MenuItem value={"medium"}>Medium</MenuItem>
                    <MenuItem value={"small"}>Small</MenuItem>
                    <MenuItem value={"xsmall"}>XSmall</MenuItem>
                  </Select>
                </FormControl>
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