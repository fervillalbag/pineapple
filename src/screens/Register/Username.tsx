import * as yup from "yup";
import { Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { Button, Input, Text } from "../../ui";
import { authStepAnimation } from "../../utils/animation";
import { useLocalStorageState } from "../../hooks";
import { NURA_AUTH_REGISTER_INFO } from "../../utils/constants";

const registerValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("El nombre completo es obligatorio"),
});

export default function Username() {
  const navigate = useNavigate();
  const location = useLocation();

  const [value] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
  });

  const handleNext = async (values: any) => {
    // update user endpoint
    console.log({ values });
    navigate("/register-photos", {
      state: {
        fullname: value.fullname,
        username: values.username,
      },
    });
  };

  return (
    <div>
      <HeaderAuth
        image="/images/bg-register-username.jpg"
        title=""
        subtitle={`Ingrese su nombre de usuario`}
      />

      <Formik
        validationSchema={registerValidationSchema}
        validator={() => ({})}
        initialValues={{
          username: location.state.username || "",
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
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={authStepAnimation}
            >
              <Input
                data-test="register-input-name"
                placeholder="Ej: lucas_lamas"
                value={values.username}
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
              />

              {errors.username && (
                <Text
                  data-test="register-feedback-error"
                  className="text-red-500 mt-2"
                >
                  {errors.username as string}
                </Text>
              )}
            </motion.div>

            <FooterAuth
              footerText="Ya tienes una cuenta?"
              routeText="Inicia sesion"
              routeLink="/login-email"
              currentStep={1}
              disableFooterText={false}
            >
              <div />
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
