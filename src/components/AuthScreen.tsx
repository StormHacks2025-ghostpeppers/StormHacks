import { useState } from "react";
import imgChatGptImageOct42025032217Pm1 from "figma:asset/236a27e3a7b1aa9454a20fe24fa9e1b04d2d02f2.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Card } from "./ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Header } from "./Header";

interface AuthScreenProps {
  onAuthSuccess?: () => void;
  onNavigate: (
    page: "main" | "fridge" | "recipes" | "account",
  ) => void;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  fullName?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
}

export function AuthScreen({
  onAuthSuccess,
  onNavigate,
}: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState("signin");
  const [signInData, setSignInData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [signInErrors, setSignInErrors] = useState<FormErrors>(
    {},
  );
  const [signUpErrors, setSignUpErrors] = useState<FormErrors>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "success" | "error" | null
  >(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateSignIn = (): boolean => {
    const errors: FormErrors = {};

    if (!signInData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(signInData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!signInData.password) {
      errors.password = "Password is required";
    } else if (signInData.password.length < 6) {
      errors.password =
        "Password must be at least 6 characters";
    }

    setSignInErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignUp = (): boolean => {
    const errors: FormErrors = {};

    if (!signUpData.fullName) {
      errors.fullName = "Full name is required";
    }

    if (!signUpData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(signUpData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!signUpData.password) {
      errors.password = "Password is required";
    } else if (signUpData.password.length < 6) {
      errors.password =
        "Password must be at least 6 characters";
    }

    if (!signUpData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (
      signUpData.password !== signUpData.confirmPassword
    ) {
      errors.confirmPassword = "Passwords don't match";
    }

    setSignUpErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSignIn()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      console.log("Sign in successful:", signInData);
      if (onAuthSuccess) {
        setTimeout(() => onAuthSuccess(), 1000);
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSignUp()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      console.log("Sign up successful:", signUpData);
      if (onAuthSuccess) {
        setTimeout(() => onAuthSuccess(), 1000);
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="bg-white relative size-full min-h-screen"
      data-name="AUTH SCREEN"
    >
      <Header currentPage="account" onNavigate={onNavigate} />
      {/* Background Image */}
      <div
        className="absolute h-[1292px] left-[49px] top-[0px] w-[861px]"
        data-name="Background Image"
      >
        <img
          alt="Kitchen appliances background"
          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
          src={imgChatGptImageOct42025032217Pm1}
        />
      </div>

      {/* Auth Form Container */}
      <div className="absolute left-[873px] top-[310px] w-[479px]">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Tab Headers */}
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger
              value="signin"
              className="data-[state=active]:bg-[#c62003] data-[state=active]:text-white"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-[#c62003] data-[state=active]:text-white"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Sign In Tab */}
          <TabsContent value="signin" className="space-y-6">
            <h1
              className="font-['Fraunces:SemiBold',_sans-serif] text-[45px] text-black leading-[normal]"
              style={{
                fontVariationSettings: "'SOFT' 0, 'WONK' 1",
              }}
            >
              Sign In To Your Account
            </h1>

            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="signin-email"
                  className="text-[24px] text-black"
                >
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="signin-email"
                    type="email"
                    value={signInData.email}
                    onChange={(e) =>
                      setSignInData({
                        ...signInData,
                        email: e.target.value,
                      })
                    }
                    className="h-[99px] border-[3px] border-black rounded-[10px] bg-white text-[18px] px-6"
                    placeholder="Enter your email"
                  />
                  {signInErrors.email && (
                    <div className="flex items-center gap-2 mt-2 text-red-600">
                      <AlertCircle size={16} />
                      <span className="text-sm">
                        {signInErrors.email}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="signin-password"
                  className="text-[24px] text-black"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="signin-password"
                    type="password"
                    value={signInData.password}
                    onChange={(e) =>
                      setSignInData({
                        ...signInData,
                        password: e.target.value,
                      })
                    }
                    className="h-[99px] border-[3px] border-black rounded-[10px] bg-white text-[18px] px-6"
                    placeholder="Enter your password"
                  />
                  {signInErrors.password && (
                    <div className="flex items-center gap-2 mt-2 text-red-600">
                      <AlertCircle size={16} />
                      <span className="text-sm">
                        {signInErrors.password}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {submitStatus === "success" && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle2 size={16} />
                  <span>Sign in successful!</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle size={16} />
                  <span>Sign in failed. Please try again.</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-[380px] h-[70px] bg-[#c62003] hover:bg-[#a01802] text-white rounded-[30px] text-[26px] font-['Fraunces:SemiBold',_sans-serif]"
                style={{
                  fontVariationSettings: "'SOFT' 0, 'WONK' 1",
                }}
              >
                {isSubmitting ? "Signing In..." : "Log In"}
              </Button>
            </form>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup" className="space-y-6">
            <h1
              className="font-['Fraunces:SemiBold',_sans-serif] text-[45px] text-black leading-[normal]"
              style={{
                fontVariationSettings: "'SOFT' 0, 'WONK' 1",
              }}
            >
              Create Your Account
            </h1>

            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="signup-fullname"
                  className="text-[24px] text-black"
                >
                  Full Name
                </Label>
                <div className="relative">
                  <Input
                    id="signup-fullname"
                    type="text"
                    value={signUpData.fullName}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        fullName: e.target.value,
                      })
                    }
                    className="h-[99px] border-[3px] border-black rounded-[10px] bg-white text-[18px] px-6"
                    placeholder="Enter your full name"
                  />
                  {signUpErrors.fullName && (
                    <div className="flex items-center gap-2 mt-2 text-red-600">
                      <AlertCircle size={16} />
                      <span className="text-sm">
                        {signUpErrors.fullName}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="signup-email"
                  className="text-[24px] text-black"
                >
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="signup-email"
                    type="email"
                    value={signUpData.email}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        email: e.target.value,
                      })
                    }
                    className="h-[99px] border-[3px] border-black rounded-[10px] bg-white text-[18px] px-6"
                    placeholder="Enter your email"
                  />
                  {signUpErrors.email && (
                    <div className="flex items-center gap-2 mt-2 text-red-600">
                      <AlertCircle size={16} />
                      <span className="text-sm">
                        {signUpErrors.email}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="signup-password"
                  className="text-[24px] text-black"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type="password"
                    value={signUpData.password}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        password: e.target.value,
                      })
                    }
                    className="h-[99px] border-[3px] border-black rounded-[10px] bg-white text-[18px] px-6"
                    placeholder="Create a password"
                  />
                  {signUpErrors.password && (
                    <div className="flex items-center gap-2 mt-2 text-red-600">
                      <AlertCircle size={16} />
                      <span className="text-sm">
                        {signUpErrors.password}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="signup-confirm-password"
                  className="text-[24px] text-black"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    value={signUpData.confirmPassword}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="h-[99px] border-[3px] border-black rounded-[10px] bg-white text-[18px] px-6"
                    placeholder="Confirm your password"
                  />
                  {signUpErrors.confirmPassword && (
                    <div className="flex items-center gap-2 mt-2 text-red-600">
                      <AlertCircle size={16} />
                      <span className="text-sm">
                        {signUpErrors.confirmPassword}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {submitStatus === "success" && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle2 size={16} />
                  <span>Account created successfully!</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle size={16} />
                  <span>
                    Account creation failed. Please try again.
                  </span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-[380px] h-[70px] bg-[#c62003] hover:bg-[#a01802] text-white rounded-[30px] text-[26px] font-['Fraunces:SemiBold',_sans-serif]"
                style={{
                  fontVariationSettings: "'SOFT' 0, 'WONK' 1",
                }}
              >
                {isSubmitting
                  ? "Creating Account..."
                  : "Sign Up"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}