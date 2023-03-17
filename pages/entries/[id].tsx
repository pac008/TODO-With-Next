import { ChangeEvent, useState, useMemo, FC, useContext } from "react";
import { GetServerSideProps } from "next";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  capitalize,
  IconButton,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/Saveoutlined";
import DeleteOutlinedIcon from "@mui/icons-material/Deleteoutlined";
import { Layout } from "@/components/layouts";
import { EntryStatus, Entry } from "../../interfaces/entry";
import { getEntryById } from "@/db";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { getFormatDistanceToNow } from "@/utils";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const isNotValid = useMemo(
    () => inputValue.length <= 0 && isTouched,
    [inputValue, isTouched]
  );
  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };
  const onSave = () => {
    if (inputValue.trim().length === 0) return;
    setIsTouched(false);
    updateEntry({ ...entry, description: inputValue, status }, true);
  };
  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada`}
              subheader={`creada hace ${getFormatDistanceToNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onBlur={() => setIsTouched(true)}
                onChange={onTextFieldChanged}
                helperText={isNotValid && "Ingrese un valor"}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string };
  const entry = await getEntryById(id);
  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { entry },
  };
};

export default EntryPage;
