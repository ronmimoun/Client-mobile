import { Loader } from "./Loader";

export const Preloader = () => {
  return (
    <>
      <div className="preloader-activate preloader-active">
        <div className="preloader-area-wrap">
          <div className="spinner d-flex justify-content-center align-items-center h-100"></div>
          <Loader />
        </div>
      </div>
    </>
  );
};
