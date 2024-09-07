import { Box } from "@chakra-ui/react";
import { Login } from "../components/form/Login";
import { UseFormContext } from "../context/UseFormContext";

export const LoginPage = () => {
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
      <Login formData={formData} selectChange={handleChange} />
    </Box>
  );
};
