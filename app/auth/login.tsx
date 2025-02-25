import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';

import LoginForm from '../../components/LoginForm';
import { useAuth } from '../../context/AuthContext';
import { LoginCredentials } from '../../types/user';

export default function LoginScreen() {
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      await login(credentials);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
      Alert.alert('Login Failed', err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View className="flex-1 justify-center items-center p-4 bg-white">
        <View className="w-full max-w-sm">
          {/* Logo placeholder - replace with your actual logo */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-indigo-700 rounded-full mb-4 items-center justify-center">
              <Text className="text-white text-xl font-bold">LOGO</Text>
            </View>
            <Text className="text-3xl font-bold mb-1 text-center">Welcome Back</Text>
            <Text className="text-gray-600 mb-8 text-center">
              Sign in to continue to your account
            </Text>
          </View>

          {error && (
            <View className="bg-red-100 p-3 rounded-md mb-4">
              <Text className="text-red-700">{error}</Text>
            </View>
          )}

          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-600">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/register')}>
              <Text className="text-indigo-700 font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
