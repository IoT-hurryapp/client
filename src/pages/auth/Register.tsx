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
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();
  const handleSubmit = async () => {
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
          description: "Register successfully!",
          title: "Success",
          variant: "default",
        });
        setTimeout(() => {
          navigate("/locations");
        }, 600);
      }
    } catch (err) {
      toast({
        description: "Register successfully!",
        title: "Success",
        variant: "default",
      });
    }
  };
  return (
    <div className="container h-[100vh] flex items-center justify-center">
      <Card className="md:min-w-[45vw] lg:min-w-[35vw] max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full name</Label>
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  id="full-name"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="At leasted 8 characters password"
              />
            </div>
            <Button onClick={handleSubmit} className="w-full mt-3">
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
