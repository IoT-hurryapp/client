import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    console.log("click");

    navigate(-1);
  };
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold text-[#1A2238] tracking-widest">
        404
      </h1>
      <div className="bg-white mb-12 border-2 border-[#16a34a] border-dashed py-2 px-2 text-sm rounded-md rotate-[-12deg] absolute">
        هذه الصفحة غير موجودة
      </div>
      <Button
        variant={"outline"}
        className="w-fit  font-bold px-8"
        onClick={goBack}
      >
        رجوع
      </Button>
    </main>
  );
};

export default NotFound;
