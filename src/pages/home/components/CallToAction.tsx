import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

const CallToAction = () => {
  return (
    <>
      <Button className="bg-[#16a34a] hover:bg-[#168e42]">
        <Link to="/register">Get started for free</Link>
      </Button>
      <Button variant={"outline"}>
        <Link to="/locations/public">See public devices</Link>
      </Button>
    </>
  );
};

export default CallToAction;
