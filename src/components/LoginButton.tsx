import React from "react";
import { StyleSheet, Pressable, Text, TextStyle } from "react-native";
import { LoginButtonType } from "@/types";
import { useFonts } from "expo-font";

interface Props {
  buttonText: String;
  buttonType: LoginButtonType;
}

const LoginButton = (props: Props) => {
  const selectedButtonStyle = loginButtonStyleMap[props.buttonType];
  const selectedTextStyles = loginButtonTextStyleMap[props.buttonType];

  return (
    <Pressable
      style={[styles.DefaultStyling, selectedButtonStyle]}
      onTouchEnd={() => console.log(`Logging in with ${props.buttonType}`)}
    >
      <Text style={[styles.text, selectedTextStyles]}>{props.buttonText}</Text>
    </Pressable>
  );
};
export default LoginButton;

const styles = StyleSheet.create({
  DefaultStyling: {
    width: "85%",
    paddingVertical: 15,
    paddingBottom: 15,
    borderWidth: 3,
    borderRadius: 15,
  },
  text: {
    alignSelf: "center",
    fontFamily: "LexendDecaRegular",
    fontSize: 18,
  },
});

// Button Styles
const buttonStyles = StyleSheet.create({
  Apple: {
    backgroundColor: "#000",
  },
  Google: {
    backgroundColor: "#4285F4",
    borderWidth: 0,
  },
  Email_Password: {},
  No_Account: {
    borderWidth: 0,
  },
});

// Text Styles
const textStyles = StyleSheet.create({
  Apple: {
    color: "#fff",
  },
  Google: {},
  Email_Password: {},
  No_Account: {
    color: "#72BCD4",
  },
});

const loginButtonStyleMap: Record<LoginButtonType, TextStyle> = {
  [LoginButtonType.Apple]: buttonStyles.Apple,
  [LoginButtonType.Google]: buttonStyles.Google,
  [LoginButtonType.Email_Password]: buttonStyles.Email_Password,
  [LoginButtonType.No_Account]: buttonStyles.No_Account,
};

const loginButtonTextStyleMap: Record<LoginButtonType, TextStyle> = {
  [LoginButtonType.Apple]: textStyles.Apple,
  [LoginButtonType.Google]: textStyles.Google,
  [LoginButtonType.Email_Password]: textStyles.Email_Password,
  [LoginButtonType.No_Account]: textStyles.No_Account,
};
