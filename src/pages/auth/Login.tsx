import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useState } from "react";
import { toast } from "../../components/ui/use-toast";
import { useLoginMutation } from "../../services/queries/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const loginMutation = useLoginMutation();
  const onSubmit = (e: any) => {
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
    loginMutation.mutate({ email, password });
    if (loginMutation.isSuccess) {
      toast({
        description: "Login successfully!",
        title: "Success",
        variant: "default",
      });
      setTimeout(() => {
        navigate("/locations");
      }, 1200);
    }
  };
  return (
    <div className="flex justify-center items-center h-full w-full absolute top-0 l-0">
      <div className="lg:w-[45%] md:w-[75%] sm:w-[90%]">
        <Card className="">
          <CardHeader className="flex-col items-center">
            <CardTitle>Type your Email and Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="flex flex-col gap-3" onSubmit={onSubmit} action="">
              <Input
                autoFocus={true}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email"
              />
              <Input
                autoFocus={true}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter your password"
              />
              <Button
                variant="default"
                onClick={async () => {}}
                className="w-full mt-5"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
