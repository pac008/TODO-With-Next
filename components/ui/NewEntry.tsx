import { useState, ChangeEvent, useContext } from "react";
import { Box, Button, TextField } from "@mui/material";
import SaveoutlinedIcon from "@mui/icons-material/Saveoutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { UIContext } from "../../context/ui/UIContext";

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const onTextFieldChanged = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event?.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setInputValue("");
    setIsTouched(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="nueva entrada"
            autoFocus
            multiline
            onBlur={() => setIsTouched(true)}
            label="nueva entrada"
            value={inputValue}
            onChange={onTextFieldChanged}
            error={inputValue.length <= 0 && isTouched}
            helperText={
              inputValue.length <= 0 && isTouched && "ingrese un valor"
            }
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={() => setIsAddingEntry(false)}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveoutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          onClick={() => setIsAddingEntry(true)}
          variant="outlined"
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
