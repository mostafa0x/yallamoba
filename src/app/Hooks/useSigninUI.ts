import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React, { useEffect, useState } from "react";

export default function useSigninUI() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, seterrorMessage] = useState<string | null>(null);

  const handleSetSubmit = (type: number) => {
    type === 1 ? setIsSubmitting(true) : setIsSubmitting(false);
  };
  const handleSetAnimating = (type: number) => {
    type === 1 ? setIsAnimating(true) : setIsAnimating(false);
  };

  useEffect(() => {
    window.scroll(0, 0);

    return () => {
      handleSetSubmit(-1);
      handleSetAnimating(-1);
    };
  }, []);

  return {
    isAnimating,
    isSubmitting,
    errorMessage,
    handleSetSubmit,
    handleSetAnimating,
    seterrorMessage,
  };
}
