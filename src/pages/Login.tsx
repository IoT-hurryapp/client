import { useSearchParams, useNavigate } from "react-router-dom";
import { Input } from "../shadcn-components/ui/input";
import { Button } from "../shadcn-components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../shadcn-components/ui/card";
import { useState } from "react";
import { toast } from "../shadcn-components/ui/use-toast";
import { useLoginMutation } from "../services/queries/auth";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState<string>("");
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

    let data = JSON.stringify({
      email,
      password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5050/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        toast({
          description: "Login successfully!",
          title: "Success",
          variant: "default",
        });
        setTimeout(() => {
          location.href = "/locations";
        }, 2000);
      })
      .catch((error) => {
        return toast({
          description: error?.response.data.message,
          title: "Error",
          variant: "default",
        });
      });

    // loginMutation.mutate({ email, password });
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
