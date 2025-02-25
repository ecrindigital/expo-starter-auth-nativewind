import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { user } = useAuth();

  const name = user?.name ?? 'Anonymous';
  const email = user?.email ?? 'No email provided';
  const avatar = user?.avatar ?? null;
  const bio = user?.bio ?? 'No bio provided';
  const location = user?.location ?? 'Not specified';
  const phone = user?.phone ?? 'Not provided';

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="items-center p-6">
        <View className="mb-6 items-center">
          {avatar ? (
            <Image source={{ uri: avatar }} className="w-28 h-28 rounded-full" />
          ) : (
            <View className="w-28 h-28 rounded-full bg-indigo-100 items-center justify-center">
              <Text className="text-3xl font-semibold text-indigo-700">
                {name?.charAt(0) || 'U'}
              </Text>
            </View>
          )}
          <Text className="text-2xl font-bold mt-4">{name}</Text>
          <Text className="text-gray-500">{email}</Text>
        </View>

        <View className="w-full bg-white rounded-xl shadow-sm mb-4">
          <View className="p-4 border-b border-gray-100">
            <Text className="text-lg font-semibold mb-2">Profile Information</Text>
            <View className="space-y-2">
              <View>
                <Text className="text-gray-500 text-sm">Name</Text>
                <Text className="font-medium">{name}</Text>
              </View>
              <View>
                <Text className="text-gray-500 text-sm">Email</Text>
                <Text className="font-medium">{email}</Text>
              </View>
              <View>
                <Text className="text-gray-500 text-sm">User ID</Text>
                <Text className="font-medium">{user?.id ?? 'Not available'}</Text>
              </View>
              <View>
                <Text className="text-gray-500 text-sm">Bio</Text>
                <Text className="font-medium">{bio}</Text>
              </View>
              <View>
                <Text className="text-gray-500 text-sm">Location</Text>
                <Text className="font-medium">{location}</Text>
              </View>
              <View>
                <Text className="text-gray-500 text-sm">Phone</Text>
                <Text className="font-medium">{phone}</Text>
              </View>
            </View>
          </View>
        </View>

        <Button
          label="Edit Profile"
          onPress={() => alert('Edit profile functionality would go here')}
          variant="primary"
          fullWidth={false}
        />
      </View>
    </ScrollView>
  );
}
