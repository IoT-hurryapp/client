import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

const CallToAction = () => {
  return (
    <>
      <Link to="/register">
        <Button className="bg-[#16a34a] hover:bg-[#168e42]">
          ابد الان مجانا !
        </Button>
      </Link>
      <Link to="/locations/public">
        <Button variant={"outline"}>او تصفح الاجهزة العامة</Button>
      </Link>
    </>
  );
};

export default CallToAction;
