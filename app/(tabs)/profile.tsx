import React from "react";
import { View, StyleSheet } from "react-native";
import { EnhancedProfile } from "@/components/EnhancedProfile";
import { colors } from "@/constants/colors";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <EnhancedProfile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});