import React from "react";
type props = {
  isSubmitting: boolean;
  buttonText: string
  classType: string
  errorMessage: string | null
}

export default function ButtonSign({ isSubmitting, buttonText, classType, errorMessage }: props) {
  return (<>
    <button type="submit" className={`w-full ${classType === "signin" ? "bg-blue-700 hover:bg-blue-900" : "bg-green-500 hover:bg-green-900"} ${isSubmitting ? "cursor-wait" : ""} text-white font-semibold py-2 mt-4 rounded`}>
      {isSubmitting ? "Loading..." : buttonText}
    </button>
    {errorMessage ? <div className="flex justify-center text-center animate-shake animate-once">
      <h1 className=" text-error text-lg">{errorMessage}</h1>
    </div> : null}
  </>
  );
}

