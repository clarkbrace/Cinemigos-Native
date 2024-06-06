import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import UserMovieDataProvider, { useUserMovieData } from "@providers/UserMovieDataProvider";
import MovieCacheProvider from "@/src/providers/MovieCacheProvider";
import { useColorScheme } from "@components/useColorScheme";
import MovieStackDataProvider from "@providers/MovieStackProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Font and
  const [loaded, error] = useFonts({
    SpaceMono: require("@assets/fonts/SpaceMono-Regular.ttf"),
    LexendDecaBold: require("@/assets/fonts/Lexend Deca Bold.ttf"),
    LexendDecaExtraLight: require("@/assets/fonts/Lexend Deca ExtraLight.ttf"),
    LexendDecaLight: require("@/assets/fonts/Lexend Deca Light.ttf"),
    LexendDecaMedium: require("@/assets/fonts/Lexend Deca Medium.ttf"),
    LexendDecaRegular: require("@/assets/fonts/Lexend Deca Regular.ttf"),
    LexendDecaSemiBold: require("@/assets/fonts/Lexend Deca SemiBold.ttf"),
    LexendDecaThin: require("@/assets/fonts/Lexend Deca Thin.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <MovieStackDataProvider>
        <MovieCacheProvider>
          <UserMovieDataProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            </Stack>
          </UserMovieDataProvider>
        </MovieCacheProvider>
      </MovieStackDataProvider>
    </ThemeProvider>
  );
}
