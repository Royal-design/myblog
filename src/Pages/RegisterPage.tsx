import { Box } from "@chakra-ui/react";
import { Register } from "../components/form/Register";
import { UseFormContext } from "../context/UseFormContext";

export const RegisterPage = () => {
  const { formData, handleChange } = UseFormContext();
  return (
    <Box
      width={"100%"}
      flexDirection={"column"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"30rem"}
    >
      <Register formData={formData} selectChange={handleChange} />
    </Box>
  );
};
