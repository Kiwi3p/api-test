import { useLottie } from "lottie-react";
import dogLoad from "../animations/dog-load.json"

interface LottieProps {
    animationData?: any;
}

const LottieAnimation: React.FC<LottieProps> = () => {
  const options = {
    animationData: dogLoad,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);
  
  return (
    <>
     <div className="lottie-container">{View}</div>
    </>
  );
}

export default LottieAnimation
