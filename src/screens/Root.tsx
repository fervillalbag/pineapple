import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Text, textVariants } from "../ui";
import { WindowSizeContext } from "../context";

const Root: React.FC = () => {
  const navigate = useNavigate();
  const { windowSize } = useContext(WindowSizeContext);

  return (
    <div className={`h-[${windowSize}px]`}>
      <div className="relative h-[60vh]">
        <img
          src="/images/bg-auth.png"
          alt=""
          className="w-full h-[70vh] object-cover object-bottom"
        />

        <div className="w-full absolute top-0 left-0 h-[70vh] bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="absolute w-full bottom-0 z-10 p-4 pb-8">
        <Text
          className={textVariants({
            variant: "heading",
            className: "text-4xl leading-[42px] mb-2",
          })}
        >
          Empieza a comprar y vender de forma segura
        </Text>
        <Text className="text-@sura-text">
          Se prima la experiencia del usuario y la seguridad usando
          nuestro sitio
        </Text>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button onClick={() => navigate("/register")}>
            Crear cuenta
          </Button>
          <Button variant="outline">Iniciar sesion</Button>
        </div>
      </div>
    </div>
  );
};

export default Root;