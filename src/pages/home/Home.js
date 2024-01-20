import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "../../components/layouts/MainLayout";
import CustomCarousel from "../../components/custom-carousel/CustomCarousel";

const Home = () => {
  const { user } = useSelector((state) => state.userInfo);

  return (
    <MainLayout>
      <CustomCarousel />

      {/* display book */}
      <div className="container-fluid mt-5">Display books here!</div>
    </MainLayout>
  );
};

export default Home;
