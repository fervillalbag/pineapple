import React, { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { m } from "framer-motion";

import {
  Footer as FooterAuth,
  Header as HeaderAuth,
} from "../../components/Auth";
import { Button, Input, Text } from "../../ui";
import { mailformat } from "../../utils/regex";
import {
  SURA_AUTH_REGISTER_INFO,
  authInitialValue,
} from "../../utils/constants";
import { useLocalStorageState } from "../../hooks/useAuth";
import { authStepAnimation } from "../../utils/animation";
import { useHeight } from "../../hooks";
import { RegisterUserProps } from "../../interface";
import { getUser } from "../../services";
import toast from "react-hot-toast";

const registerValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Debe ser un correo válido")
    .matches(new RegExp(mailformat), "Debe ser un correo válido")
    .required("El correo es obligatorio"),
});

const Email: React.FC = () => {
  const navigate = useNavigate();
  const styleHeight = useHeight();
  const [loading, setLoading] = useState<boolean>(false);

  const [userInfoValue] =
    useState<RegisterUserProps>(authInitialValue);

  const [initialValues, handleUpdate] = useLocalStorageState({
    key: SURA_AUTH_REGISTER_INFO,
    value: userInfoValue,
  });

  const handleNext = async (values: { email: string }) => {
    setLoading(true);

    try {
      await getUser("email", values.email);
      toast.error("Este correo ya existe");
    } catch (error) {
      handleUpdate({
        email: values.email,
      });
      navigate("/register-password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styleHeight}>
      <HeaderAuth
        image="/images/bg-register-email.jpg"
        title=""
        subtitle={`Ingrese su correo electronico`}
      />

      <Formik
        validationSchema={registerValidationSchema}
        validator={() => ({})}
        initialValues={{
          email: initialValues.email || "",
        }}
        onSubmit={(values: { email: string }) => handleNext(values)}
      >
        {({
          handleBlur,
          handleChange,
          values,
          handleSubmit,
          errors,
        }) => (
          <form className="p-5" onSubmit={handleSubmit}>
            <m.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={authStepAnimation}
            >
              <Input
                type="email"
                data-test="register-input-email"
                placeholder="Ej: lucas@gmail.com"
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                isLoading={loading}
              />

              {errors.email && (
                <Text
                  data-test="register-feedback-error"
                  className="text-red-500 mt-2"
                >
                  {errors.email as string}
                </Text>
              )}
            </m.div>

            <FooterAuth
              footerText="Ya tienes una cuenta?"
              routeText="Inicia sesion"
              routeLink="/login"
              currentStep={1}
              count={5}
            >
              <Button
                type="button"
                onClick={() => navigate("/register")}
                variant="outline"
              >
                Volver
              </Button>
              <Button
                data-test="register-button-submit"
                type="submit"
                isLoading={loading}
              >
                Siguiente
              </Button>
            </FooterAuth>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Email;
