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
import { useSendVerifyEmailTokenMutation } from "../services/queries/auth";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const sendVerifyEmailMutation = useSendVerifyEmailTokenMutation();
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
    const mutation = sendVerifyEmailMutation.mutate({ email });
    toast({
      description: "the code has been sent to your email!",
      title: "Success",
      variant: "default",
    });
  };
  return (
    <div className="flex justify-center items-center h-full w-full absolute top-0 l-0">
      <div className="lg:w-[45%] md:w-[75%] sm:w-[90%]">
        <Card className="">
          <CardHeader className="flex-col items-center">
            <CardTitle>Type your Email</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              autoFocus={true}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email"
            />
            <Button
              variant="default"
              onClick={onSubmit}
              className="w-full mt-5"
            >
              Get Code
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
