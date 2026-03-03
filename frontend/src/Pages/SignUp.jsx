import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../Features/Auth/AuthSlice";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const SignUp = () => {
    const dispatch = useDispatch();
    const { user, error, loading } = useSelector((state) => state.auth); // Select error state
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        if (user) {
            navigate("/profile/edit"); // Change "/dashboard" to the desired route
        }
    }, [user, navigate]);
    const onSubmit = (data) => {
        dispatch(signupUser(data));
    };

  return (
  <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-950 to-black px-4">
    
    <Card className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 shadow-2xl rounded-2xl p-8">
      
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold text-white">
          Create <span className="text-purple-500">Account</span>
        </CardTitle>
        <p className="text-center text-gray-400 mt-2">
          Join CampusCompass and start building your journey
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-gray-300">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name"
              className="mt-2 bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-purple-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-gray-300">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="mt-2 bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
              placeholder="Enter your password"
              className="mt-2 bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-purple-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-xl transition-all shadow-lg"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>

          <p className="text-sm text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-400 hover:underline"
            >
              Sign in here
            </Link>
          </p>

        </form>
      </CardContent>
    </Card>

  </main>
);

};

export default SignUp;
