import { useEffect, useState } from "react";

export default function useSignUpUI() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startSubmit = () => {
    setErrorMessage(null);
    setIsSubmitting(true);
  };

  const endSubmit = () => {
    setIsSubmitting(false);
  };

  const triggerAnimation = () => {
    setIsAnimating(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => setIsAnimating(false);
  }, []);

  return {
    isAnimating,
    isSubmitting,
    errorMessage,
    setErrorMessage,
    triggerAnimation,
    startSubmit,
    endSubmit,
  };
}
