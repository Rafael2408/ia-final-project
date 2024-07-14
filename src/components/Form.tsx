import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Box, Stepper, Step, StepLabel } from "@mui/material";
import StepContent from "../helpers/StepContent";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../store/actions/formActions";
import { RootState, AppDispatch } from "../store";
import { setFormData } from "../store/reducers/formReducer"; // Importar setFormData desde el reductor

const steps = [
  "Datos del Álbum",
  "Datos de la Canción",
  "Atributos de la Canción",
  "Características Adicionales",
];

const Form = () => {
  const methods = useForm({
    defaultValues: {
      album_name: "",
      track_name: "",
      duration_ms: 0,
      explicit: 0,
      danceability: 0,
      energy: 0,
      key: 0,
      loudness: 0,
      mode: 0,
      speechiness: 0,
      acousticness: 0,
      instrumentalness: 0,
      liveness: 0,
      valence: 0,
      tempo: 0,
      time_signature: 0,
      track_genre: null,
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.form.formData);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = (data: any) => {
    dispatch(setFormData({ ...formData, ...data }));

    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
      methods.reset({ ...formData, ...data });
    } else {
      const allData: any = { ...formData, ...data };
      allData.duration_ms = allData.duration_ms * 1000;
      console.log(allData);
      dispatch(submitForm(allData));
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      methods.reset(formData);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleNext)} className="space-y-4">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={index < activeStep}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box>
          <StepContent step={activeStep} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Atrás
          </Button>
          <Button type="submit">
            {activeStep === steps.length - 1 ? "Enviar" : "Siguiente"}
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default Form;
