import { useLottie } from "lottie-react";
import barLoad from "../animations/loading-bar.json"

interface LottieProps {
    animationData?: any;
}

const LottieAnimation: React.FC<LottieProps> = () => {
  const options = {
    animationData: barLoad,
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
