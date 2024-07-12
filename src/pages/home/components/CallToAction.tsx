import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

const CallToAction = () => {
  return (
    <>
      <Link to="/register">
        <Button className="bg-[#16a34a] hover:bg-[#168e42]">
          Get started for free
        </Button>
      </Link>
      <Link to="/locations/public">
        <Button variant={"outline"}>See public devices</Button>
      </Link>
    </>
  );
};

export default CallToAction;
