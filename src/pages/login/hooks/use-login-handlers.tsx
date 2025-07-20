import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { UserLogin } from "../types";

export default function useLoginHandlers() {
  const redirect = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userLoginBody, setUserLoginBody] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const userLoginBodyRef = useRef(userLoginBody);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = useCallback((key: keyof UserLogin, value: string) => {
    setUserLoginBody((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        redirect({ to: "/" });
      } catch {
        setErrorMessage("Algo deu errado ao logar, tente novamente");
      } finally {
        setIsLoading(false);
      }
    },
    [redirect],
  );

  useEffect(() => {
    userLoginBodyRef.current = userLoginBody;
  }, [userLoginBody]);

  return { isLoading, userLoginBody, errorMessage, handleLogin, handleChange };
}
