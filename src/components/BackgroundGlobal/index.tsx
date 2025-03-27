import { Background } from "./style";
import bg from "../../assets/images/bg2.webp";
export default function BackgroundGlobal() {
  return (
    <Background>
      <img src={bg} alt="background" />
    </Background>
  );
}
