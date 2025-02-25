import React, { useState } from 'react';
import { View, TextInput, Text, ActivityIndicator } from 'react-native';

import Button from './Button';
import { RegisterCredentials } from '../types/user';

interface RegisterFormProps {
  onSubmit: (credentials: RegisterCredentials) => Promise<void>;
  isLoading?: boolean;
}

export default function RegisterForm({ onSubmit, isLoading = false }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        await onSubmit({ name, email, password });
      } catch (error) {
        throw error;
      }
    }
  };

  return (
    <View className="w-full p-4">
      <View className="mb-4">
        <Text className="mb-2 text-gray-700">Name</Text>
        <TextInput
          className={`p-4 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          autoCapitalize="words"
          onFocus={() => setErrors({ ...errors, name: undefined })}
        />
        {errors.name && <Text className="mt-1 text-red-500">{errors.name}</Text>}
      </View>

      <View className="mb-4">
        <Text className="mb-2 text-gray-700">Email</Text>
        <TextInput
          className={`p-4 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          value={email}
          onChangeText={setEmail}
          placeholder="your@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
          onFocus={() => setErrors({ ...errors, email: undefined })}
        />
        {errors.email && <Text className="mt-1 text-red-500">{errors.email}</Text>}
      </View>

      <View className="mb-4">
        <Text className="mb-2 text-gray-700">Password</Text>
        <TextInput
          className={`p-4 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          value={password}
          onChangeText={setPassword}
          placeholder="Your password"
          secureTextEntry
          onFocus={() => setErrors({ ...errors, password: undefined })}
        />
        {errors.password && <Text className="mt-1 text-red-500">{errors.password}</Text>}
      </View>

      <View className="mb-6">
        <Text className="mb-2 text-gray-700">Confirm Password</Text>
        <TextInput
          className={`p-4 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
          onFocus={() => setErrors({ ...errors, confirmPassword: undefined })}
        />
        {errors.confirmPassword && (
          <Text className="mt-1 text-red-500">{errors.confirmPassword}</Text>
        )}
      </View>

      <Button
        label={isLoading ? 'Creating account...' : 'Sign Up'}
        onPress={handleSubmit}
        disabled={isLoading}
      />

      {isLoading && <ActivityIndicator size="small" color="#4338ca" className="mt-4" />}
    </View>
  );
}
