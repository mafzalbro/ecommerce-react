import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function GoBack({ to, children = "Go Back" }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button variant="outline" onClick={handleGoBack}>
      <div className="flex items-center gap-2 transition-all">
        <AiOutlineArrowLeft size={20} />
        <span>{children}</span>
      </div>
    </Button>
  );
}

export default GoBack;
