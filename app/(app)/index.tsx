import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const name = user?.name ?? 'User';
  const email = user?.email ?? 'No email';

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <View className="bg-indigo-50 rounded-xl p-5 mb-6">
          <Text className="text-xl font-bold text-indigo-800 mb-2">👋 Welcome, {name}!</Text>
          <Text className="text-indigo-700 mb-4">You've successfully logged into the app.</Text>
          <View className="bg-white p-4 rounded-lg">
            <Text className="text-gray-500 mb-1">Your email:</Text>
            <Text className="font-semibold mb-2">{email}</Text>
            <Text className="text-gray-500 mb-1">User ID:</Text>
            <Text className="font-semibold">{user?.id ?? 'Not available'}</Text>
          </View>
        </View>

        <Text className="text-xl font-bold mb-4">Features</Text>

        <View className="space-y-4 mb-8">
          <View className="bg-gray-50 p-4 rounded-lg">
            <Text className="font-semibold mb-1">Authentication Ready</Text>
            <Text className="text-gray-600">
              The app includes a complete authentication flow with login, registration, and session
              management.
            </Text>
          </View>

          <View className="bg-gray-50 p-4 rounded-lg">
            <Text className="font-semibold mb-1">Clean Architecture</Text>
            <Text className="text-gray-600">
              Follows domain-driven design with clear separation of concerns.
            </Text>
          </View>

          <View className="bg-gray-50 p-4 rounded-lg">
            <Text className="font-semibold mb-1">Modern UI</Text>
            <Text className="text-gray-600">
              Beautiful, responsive UI with NativeWind (Tailwind CSS).
            </Text>
          </View>
        </View>

        <Button label="Logout" onPress={logout} variant="secondary" />
      </View>
    </ScrollView>
  );
}
