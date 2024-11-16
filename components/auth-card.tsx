import React, { useState } from "react";
import { Card, Tabs, Input, Button, Tab } from "@nextui-org/react";
import { useAuth } from "@/hooks/useAuth";

const AuthCard: React.FC = () => {
  const { signin, signup, user } = useAuth();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async () => {
    try {
      setError(null);
      if (activeTab === "signin") {
        await signin(email, password);
      } else if (activeTab === "signup") {
        await signup(email, password);
      }
    } catch (err: unknown) {
      setError(
        (err as Error).message || "An error occurred. Please try again."
      );
    }
  };

  if (user) {
    return <p>{user?.email}</p>;
  } else
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md p-6">
          <Tabs
            variant="underlined"
            onSelectionChange={(tab) =>
              setActiveTab(tab === 0 ? "signin" : "signup")
            }
            aria-label="Authentication Tabs"
            className="mb-6"
          >
            <Tab key="signin" title="Sign In" />
            <Tab key="signup" title="Sign Up" />
          </Tabs>

          <div className="space-y-4">
            <Input
              isClearable
              fullWidth
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              isClearable
              fullWidth
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p color="error" className="mt-4 text-sm">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <Button
            className="mt-6 w-full bg-blue-500 text-white"
            onClick={handleAuth}
          >
            {activeTab === "signin" ? "Log In" : "Sign Up"}
          </Button>
        </Card>
      </div>
    );
};

export default AuthCard;
