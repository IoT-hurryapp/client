import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { useState } from "react";
import { toast } from "../../components/ui/use-toast";
import { useRegisterMutation } from "../../services/queries/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();
  const handleSubmit = async () => {
    setIsLoading(true);
    const emailRegexp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!email) {
      return toast({
        description: "Email is Required!",
        title: "Error",
        variant: "destructive",
      });
    }
    if (!emailRegexp.test(email)) {
      return toast({
        description: "Please enter a valid email!",
        title: "Error",
        variant: "destructive",
      });
    }
    try {
      const res = await registerMutation.mutateAsync({
        email,
        username,
        password,
      });
      if (res.success) {
        toast({
          title: "نجاح",
          description: "تم انشاء الحساب بنجاح !",
          variant: "default",
        });
        setTimeout(() => {
          navigate("/locations");
        }, 1200);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "خطا",
        description: "حصل خطا اثناء انشاء الحساب",
        variant: "default",
      });
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container h-[100vh] flex items-center justify-center">
      <Card className="md:min-w-[45vw] lg:min-w-[35vw] max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">انشئ حسابك</CardTitle>
          <CardDescription>ادخل ملعوماتك من اجل انشاء الحساب</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">الاسم الكامل</Label>
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  id="full-name"
                  placeholder="ادخل اسمك الكامل"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">الايميل</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="ادخل كلمة مرور"
              />
            </div>
            <Button onClick={handleSubmit} className="w-full mt-3">
              انشئ حسابك
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            تمتلك حسابا ?{" "}
            <Link to="/login" className="underline">
              سجل الان
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
