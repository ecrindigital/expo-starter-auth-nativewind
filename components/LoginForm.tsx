import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import Button from "./Button";
import { LoginCredentials } from "../types/user";

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  isLoading?: boolean;
}

export default function LoginForm({
  onSubmit,
  isLoading = false,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        await onSubmit({ email, password });
      } catch (error) {}
    }
  };

  return (
    <View className="w-full p-4">
      <View className="mb-4">
        <Text className="mb-2 text-gray-700">Email</Text>
        <TextInput
          className={`p-4 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
          value={email}
          onChangeText={setEmail}
          placeholder="your@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
          onFocus={() => setErrors({ ...errors, email: undefined })}
        />
        {errors.email && (
          <Text className="mt-1 text-red-500">{errors.email}</Text>
        )}
      </View>

      <View className="mb-6">
        <Text className="mb-2 text-gray-700">Password</Text>
        <TextInput
          className={`p-4 border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`}
          value={password}
          onChangeText={setPassword}
          placeholder="Your password"
          secureTextEntry
          onFocus={() => setErrors({ ...errors, password: undefined })}
        />
        {errors.password && (
          <Text className="mt-1 text-red-500">{errors.password}</Text>
        )}
      </View>

      <TouchableOpacity
        className="mb-4 self-end"
        onPress={() =>
          Alert.alert(
            "Reset Password",
            "This feature would redirect to a password reset flow in a real app.",
          )
        }
      >
        <Text className="text-blue-600">Forgot password?</Text>
      </TouchableOpacity>

      <Button
        label={isLoading ? "Please wait..." : "Login"}
        onPress={handleSubmit}
        disabled={isLoading}
      />

      {isLoading && (
        <ActivityIndicator size="small" color="#4338ca" className="mt-4" />
      )}
    </View>
  );
}
