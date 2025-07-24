import { useCallback, useEffect, useRef, useState } from "react";
import { UserRegister } from "../types";
import { useNavigate } from "@tanstack/react-router";

export default function useLoginHandlers() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userRegisterBody, setUserRegisterBody] = useState<UserRegister>({
    name: "",
    email: "",
    password: "",
  });
  const userRegisterBodyRef = useRef(userRegisterBody);
  const redirect = useNavigate();

  const handleChange = useCallback((key: keyof UserRegister, value: string) => {
    setUserRegisterBody((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleRegister = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      console.log("Chegou aqui");
      e.preventDefault();
      try {
        setErrorMessage("");
        setIsLoading(true);
        sessionStorage.setItem("isLogged", "true");
        redirect({ to: "/" });
      } catch {
        setErrorMessage("Algo deu errado ao registrar, tente novamente");
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    userRegisterBodyRef.current = userRegisterBody;
  }, [userRegisterBody]);

  return {
    isLoading,
    errorMessage,
    userRegisterBody,
    handleChange,
    handleRegister,
  };
}
