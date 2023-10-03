import React, { useContext, useEffect, useState } from "react";

import {
  CategorySection,
  ModalLogin,
  PromotionSection,
  RecentsSection,
  SeasonsSection,
} from "../components/Home";
import { HeaderHome, Layout } from "../components";
import { AuthenticatedContext } from "../context";
import { SURA_CREATE_POST_INFO } from "../utils/constants";
import { Link } from "react-router-dom";
import { useMotionValueEvent, useScroll } from "framer-motion";

const Home: React.FC = () => {
  const { isAuthenticated } = useContext(AuthenticatedContext);
  const [showModalLogin, setShowModalLogin] = useState<boolean>(
    !isAuthenticated
  );

  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollPosition(latest);
  });

  useEffect(() => {
    localStorage.setItem(SURA_CREATE_POST_INFO, "");
  }, []);

  return (
    <div>
      <Layout>
        <ModalLogin
          show={showModalLogin}
          setShow={setShowModalLogin}
        />

        <HeaderHome />

        <div
          className={`sticky top-0 left-0 flex items-center gap-x-[22px] px-5 py-4 bg-white z-50 ${
            scrollPosition < 60
              ? ""
              : "shadow-md shadow-neutral-500/10"
          }`}
        >
          <Link
            to="/"
            className="font-medium text-lg text-@sura-primary-900"
          >
            Productos
          </Link>
          <Link to="/" className="text-@sura-primary-300">
            Servicios
          </Link>
          <Link to="/" className="text-@sura-primary-300">
            Comunidad
          </Link>
        </div>

        <div className="mt-1 px-5">
          <img
            src="/images/banner-promo.png"
            alt=""
            className="w-full object-cover h-40 rounded-md"
          />
        </div>

        <main className="pt-6 flex flex-col gap-y-10">
          <PromotionSection />
          <RecentsSection />
          <SeasonsSection isPromo />
          <CategorySection />
        </main>
      </Layout>
    </div>
  );
};

export default Home;
