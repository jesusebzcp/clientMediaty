import Lottie from "react-lottie";
import { IMG_NOT_FOUND } from "../src/constants";

export default function Custom404() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: IMG_NOT_FOUND,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="noFound">
      <Lottie options={defaultOptions} height={400} width={400} />
      <span>Error 404 pagina no encontrada</span>
    </div>
  );
}
