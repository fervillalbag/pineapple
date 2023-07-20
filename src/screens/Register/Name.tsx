import { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { Button, Input, Text } from "../../ui";
import { useHeight, useLocalStorageState } from "../../hooks";
import {
  NURA_AUTH_REGISTER_INFO,
  authInitialValue,
} from "../../utils/constants";
import { authStepAnimation } from "../../utils/animation";

const registerValidationSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("El nombre completo es obligatorio"),
});

export default function Name() {
  const navigate = useNavigate();
  const [userInfoValue] = useState<any>(authInitialValue);
  const styleHeight = useHeight();

  const [initialValues, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
    value: userInfoValue,
  });

  const handleNext = async (values: any) => {
    handleUpdateForm(values);
    navigate("/register-email");
  };

  return (
    <div style={styleHeight}>
      <HeaderAuth
        image="/images/bg-register-fullname.jpg"
        title=""
        subtitle={`Ingrese su nombre completo`}
      />

      <Formik
        validationSchema={registerValidationSchema}
        validator={() => ({})}
        initialValues={{
          fullname: initialValues?.fullname || "",
        }}
        onSubmit={(values: any) => handleNext(values)}
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
                data-test="register-input-name"
                placeholder="Ej: Lucas Lamas"
                value={values.fullname}
                onChange={handleChange("fullname")}
                onBlur={handleBlur("fullname")}
              />

              {errors.fullname && (
                <Text
                  data-test="register-feedback-error"
                  className="text-red-500 mt-2"
                >
                  {errors.fullname as string}
                </Text>
              )}
            </m.div>

            <FooterAuth
              footerText="Ya tienes una cuenta?"
              routeText="Inicia sesion"
              routeLink="/login-email"
              currentStep={1}
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
              >
                Siguiente
              </Button>
            </FooterAuth>
          </form>
        )}
      </Formik>
    </div>
  );
}
