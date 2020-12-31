import { IMG_LOADING } from "../../constants";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: IMG_LOADING,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const Loading = () => {
  return (
    <div className="containerLoading">
      <Lottie
        options={defaultOptions}
        height={300}
        width={300}
        style={{ margin: "-4rem" }}
      />
      <span>Cargando.......</span>
    </div>
  );
};
export default Loading;
