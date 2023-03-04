import notFoundSvg from "assets/404.svg";
import { useNavigate } from "react-router";
import { Button } from "@chakra-ui/react";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <img src={notFoundSvg} />
      <p>Page Not Found</p>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );
}
