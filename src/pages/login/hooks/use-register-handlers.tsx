import { useCallback, useEffect, useRef, useState } from "react";
import { UserRegister } from "../types";

export default function useLoginHandlers() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userRegisterBody, setUserRegisterBody] = useState<UserRegister>({
    name: "",
    email: "",
    password: "",
  });
  const userRegisterBodyRef = useRef(userRegisterBody);

  const handleChange = useCallback((key: keyof UserRegister, value: string) => {
    setUserRegisterBody((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleRegister = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setErrorMessage("");
        setIsLoading(true);
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
