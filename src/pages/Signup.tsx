import { Input } from "../shadcn-components/ui/input";
import { Button } from "../shadcn-components/ui/button";
import { Label } from "../shadcn-components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../shadcn-components/ui/card";
import { useState } from "react";
import { toast } from "../shadcn-components/ui/use-toast";
import { useRegisterMutation } from "../services/queries/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();
  const onSubmit = () => {
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
    registerMutation.mutate({ email, password, username });
    if (registerMutation.isSuccess) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
      return toast({
        description: "the code has been sent to your email check it out!",
        title: "Success",
        variant: "default",
      });
    } else {
      return toast({
        description: registerMutation.error?.response.data.message,
        title: "Success",
        variant: "default",
      });
    }
  };
  return (
    <div className="flex justify-center items-center h-full w-full absolute top-0 l-0">
      <div className="lg:w-[45%] md:w-[75%] sm:w-[90%]">
        <Card className="">
          <CardHeader className="flex-col items-center">
            <CardTitle>Type your Data</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-3">
              <Label></Label>
              <Input
                id="username"
                autoFocus={true}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your username"
              />
              <Input
                id="email"
                autoFocus={true}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email"
              />
              <Input
                id="password"
                autoFocus={true}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your password"
              />
              <Button
                variant="default"
                onClick={onSubmit}
                className="w-full mt-5"
              >
                Complete
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
