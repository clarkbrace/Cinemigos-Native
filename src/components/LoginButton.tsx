import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import { LoginButtonType } from "./utils/LoginButtonType";
import { useFonts } from "expo-font";
import { getMovieById } from "@/src/app/model/theMovieDB_API";
import viewModel from "../viewmodel/viewmodel";

interface Props {
  buttonText: String;
  buttonType: typeof LoginButtonType.Apple;
}

const LoginButton = (props: Props) => {
  const selectedButtonStyle = buttonStyleMap[props.buttonType];
  const selectedTextStyles = textStyleMap[props.buttonType];

  return (
    <Pressable style={[styles.DefaultStyling, selectedButtonStyle]} onTouchEnd={() => console.log(viewModel.signedIn)}>
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
  Email: {},
  NoAccount: {
    borderWidth: 0,
  },
});

// Text Styles
const textStyles = StyleSheet.create({
  Apple: {
    color: "#fff",
  },
  Google: {},
  Email: {},
  NoAccount: {
    color: "#72BCD4",
  },
});

// Maps to map button type to specific styles
const buttonStyleMap: { [key: string]: object } = {
  Apple: buttonStyles.Apple,
  Google: buttonStyles.Google,
  Email: buttonStyles.Email,
  NoAccount: buttonStyles.NoAccount,
};

const textStyleMap: { [key: string]: object } = {
  Apple: textStyles.Apple,
  Google: textStyles.Google,
  Email: textStyles.Email,
  NoAccount: textStyles.NoAccount,
};
