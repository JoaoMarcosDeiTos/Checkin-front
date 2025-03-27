import { CardContent } from "../../pages/home/style";
import { CardContainer, LogoContainer } from "./style";
import logoImg from "../../assets/images/logo.png";

export default function CardComponent({
  children,
  logo = true,
  maxWidth = "600px",
}: {
  children: React.ReactNode;
  logo?: boolean;
  maxWidth?: string;
}) {
  return (
    <CardContainer style={{ maxWidth: maxWidth || "none" }}>
      <CardContent>
        {logo && (
          <LogoContainer>
            <img src={logoImg} alt="Logo" />
          </LogoContainer>
        )}
        {children}
      </CardContent>
    </CardContainer>
  );
}
