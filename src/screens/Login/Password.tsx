import React, { useContext, useState } from "react";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import { m } from "framer-motion";
// @ts-ignore
import argon2 from "argon2-wasm-esm";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { Alert, Button, Input, Text } from "../../ui";
import { useHeight } from "../../hooks";
import { authStepAnimation } from "../../utils/animation";
import { NURA_AUTH_REGISTER_INFO } from "../../utils/constants";
import { AuthenticatedContext } from "../../context";
import { NURA_AUTH_USER_INFO } from "../../utils/constants/auth";

const registerValidationSchema = yup.object().shape({
  password: yup.string().required("La contrasena es obligatorio"),
});

const Password: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { isLogged, setIsLogged } = useContext(AuthenticatedContext);

  const styleHeight = useHeight();
  const [loading, setLoading] = useState<boolean>(false);

  const handleNext = async (values: any) => {
    setLoading(true);

    argon2
      .verify({
        pass: values.password,
        encoded: state?.user[0].password,
      })
      .then(() => {
        setLoading(false);
        localStorage.setItem(NURA_AUTH_REGISTER_INFO, "");
        setIsLogged(!isLogged);
        localStorage.setItem(
          NURA_AUTH_USER_INFO,
          JSON.stringify({
            id: state?.user[0]?.id,
            email: state?.user[0]?.email,
            fullname: state?.user[0]?.fullname,
          })
        );
        navigate("/home");
      })
      .catch((_: any) => {
        setLoading(false);
        toast.custom(
          (t) => (
            <Alert
              type="error"
              title="Error"
              description="Las credenciales son incorrectas."
              t={t}
              duration={2000}
            />
          ),
          { duration: 4000 }
        );
      });
  };

  return (
    <div style={styleHeight}>
      <HeaderAuth
        image="/images/bg-register-password.jpg"
        title=""
        subtitle={``}
      />

      <Formik
        validationSchema={registerValidationSchema}
        validator={() => ({})}
        initialValues={{
          password: "",
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
                data-test="register-input-password"
                type="password"
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                placeholder="nueva contrasena"
              />
              {errors.password && (
                <Text
                  data-test="register-feedback-error"
                  className="text-red-500 my-2"
                >
                  {errors.password as string}
                </Text>
              )}
            </m.div>

            <FooterAuth
              footerText="Aun no tienes una cuenta?"
              routeText="Registrate"
              routeLink="/register"
              currentStep={2}
              isLogin
            >
              <Button
                type="button"
                onClick={() => navigate("/login-email")}
                variant="outline"
              >
                Volver
              </Button>
              <Button
                isLoading={loading}
                type="submit"
                data-test="register-button-submit"
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

export default Password;