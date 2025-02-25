import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';

import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

type SettingItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress?: () => void;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  showToggle?: boolean;
  showArrow?: boolean;
  description?: string;
};

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  onPress,
  value,
  onValueChange,
  showToggle = false,
  showArrow = true,
  description,
}) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center p-4 ${description ? 'items-start' : 'items-center'}`}
      onPress={onPress}
      disabled={!onPress}
    >
      <View className="w-8 items-center">
        <Ionicons name={icon} size={22} color="#4338ca" />
      </View>
      <View className="flex-1 ml-3">
        <Text className="text-base font-medium">{title}</Text>
        {description && <Text className="text-gray-500 text-sm mt-1">{description}</Text>}
      </View>
      {showToggle && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#d1d5db', true: '#a5b4fc' }}
          thumbColor={value ? '#4338ca' : '#f3f4f6'}
        />
      )}
      {showArrow && !showToggle && <Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
    </TouchableOpacity>
  );
};

export default function SettingsScreen() {
  const { logout } = useAuth();
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => logout(),
        style: 'destructive',
      },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 py-6">
        <Text className="px-4 pb-2 text-sm font-semibold text-gray-500 uppercase">Preferences</Text>
        <View className="bg-white rounded-xl mb-6">
          <SettingItem
            icon="notifications-outline"
            title="Notifications"
            showToggle
            showArrow={false}
            value={notifications}
            onValueChange={setNotifications}
          />
          <View className="h-px bg-gray-100 mx-4" />
          <SettingItem
            icon="moon-outline"
            title="Dark Mode"
            showToggle
            showArrow={false}
            value={darkMode}
            onValueChange={setDarkMode}
          />
          <View className="h-px bg-gray-100 mx-4" />
          <SettingItem
            icon="language-outline"
            title="Language"
            onPress={() => Alert.alert('Language', 'Change language option would appear here')}
            description="English"
          />
        </View>

        <Text className="px-4 pb-2 text-sm font-semibold text-gray-500 uppercase">Account</Text>
        <View className="bg-white rounded-xl mb-6">
          <SettingItem
            icon="person-outline"
            title="Edit Profile"
            onPress={() => Alert.alert('Edit Profile', 'Profile edit screen would appear here')}
          />
          <View className="h-px bg-gray-100 mx-4" />
          <SettingItem
            icon="lock-closed-outline"
            title="Change Password"
            onPress={() =>
              Alert.alert('Change Password', 'Password change screen would appear here')
            }
          />
          <View className="h-px bg-gray-100 mx-4" />
          <SettingItem
            icon="shield-checkmark-outline"
            title="Privacy Settings"
            onPress={() =>
              Alert.alert('Privacy Settings', 'Privacy settings screen would appear here')
            }
          />
        </View>

        <Text className="px-4 pb-2 text-sm font-semibold text-gray-500 uppercase">Support</Text>
        <View className="bg-white rounded-xl mb-6">
          <SettingItem
            icon="help-circle-outline"
            title="Help Center"
            onPress={() => Alert.alert('Help Center', 'Help center screen would appear here')}
          />
          <View className="h-px bg-gray-100 mx-4" />
          <SettingItem
            icon="chatbubble-outline"
            title="Contact Us"
            onPress={() => Alert.alert('Contact Us', 'Contact form would appear here')}
          />
        </View>

        <Button label="Logout" onPress={handleLogout} variant="danger" />
      </View>
    </ScrollView>
  );
}
