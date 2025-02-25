import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  fullWidth?: boolean;
};

export default function Button({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  fullWidth = true,
}: Props) {
  const getBackgroundColor = () => {
    if (disabled) return "bg-gray-400";

    switch (variant) {
      case "primary":
        return "bg-indigo-700";
      case "secondary":
        return "bg-gray-600";
      case "danger":
        return "bg-red-600";
      default:
        return "bg-indigo-700";
    }
  };

  return (
    <Pressable
      className={`
        rounded-lg items-center justify-center p-4 
        ${getBackgroundColor()}
        ${fullWidth ? "w-full" : "px-6"}
        ${disabled ? "opacity-70" : ""}
      `}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Text className="color-white font-bold text-center text-base">{label}</Text>
    </Pressable>
  );
}
