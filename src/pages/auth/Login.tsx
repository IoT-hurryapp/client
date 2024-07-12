import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { useState } from "react";
import { toast } from "../../components/ui/use-toast";
import { useLoginMutation } from "../../services/queries/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const loginMutation = useLoginMutation();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const emailRegexp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!emailRegexp.test(email)) {
      return toast({
        description: "Email is Required!",
        title: "Error",
        variant: "destructive",
      });
    }
    if (!password || password.length < 8) {
      return toast({
        description: "Password is Required!",
        title: "Error",
        variant: "destructive",
      });
    }
    try {
      const res = await loginMutation.mutateAsync({ email, password });
      if (res.success) {
        toast({
          title: "نجاح",
          description: "Login successfully!",
          variant: "default",
        });
        setTimeout(() => {
          navigate("/locations");
        }, 1200);
      }
    } catch (err: any) {
      toast({
        title: "خطا",
        description: "الرجاء تفقد الايميل و الباسوورد",
        variant: "default",
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="container h-[100vh] flex justify-center items-center"
    >
      <Card className="md:min-w-[45vw] lg:min-w-[35vw] max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">قم بتسجيل الدخول</CardTitle>
          <CardDescription>
            قم بادخال الايميل و كلمة المرور و استمتع بالمنصة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">الايميل</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                autoFocus={true}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">كلمة المرور</Label>
              </div>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                required
              />
            </div>
            <Button className="w-full">سجل الدخول</Button>
          </div>
          <div className="mt-4 text-center text-sm">
            لا تمتلك حسابا ؟ قم بانشاء واحد{" "}
            <Link to="/register" className="underline">
              انشء حسابك
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default Login;
