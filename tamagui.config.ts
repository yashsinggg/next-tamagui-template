import { createAnimations } from "@tamagui/animations-react-native";
import { createInterFont } from "@tamagui/font-inter";
import { createMedia } from "@tamagui/react-native-media-driver";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/themes";
import { H1, SizableText, YStack, createTamagui, styled } from "tamagui";

const animations = createAnimations({
  bouncy: {
    damping: 10,
    mass: 0.9,
    stiffness: 100,
    type: "spring",
  },
  lazy: {
    damping: 20,
    type: "spring",
    stiffness: 60,
  },
  quick: {
    damping: 20,
    mass: 1.2,
    stiffness: 250,
    type: "spring",
  },
});

const Inter = createInterFont({
  family: "Inter",
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 22,
  },
  weight: {
    Thin: "100",
    Light: "300",
    Regular: "400",
    SemiBold: "600",
    Bold: "700",
    Black: "900",
  },
  face: {
    300: { normal: "InterLight", italic: "InterLight-Italic" },
    400: { normal: "InterRegular", italic: "InterRegular-Italic" },
    700: { normal: "InterBold", italic: "InterBold-Italic" },
    900: { normal: "InterBlack", italic: "InterBlack-Italic" },
  },
});

export const Container = styled(YStack, {
  flex: 1,
  padding: 24,
  maxWidth: 1440,
  width: "100%",
});

export const ContainerMini = styled(YStack, {
  flex: 1,
  padding: 24,
  maxWidth: 980,
  width: "100%",
});

export const Main = styled(YStack, {
  flex: 1,
  maxWidth: 980,
  width: "100%",
  padding: 24,

});

export const Title = styled(H1, {
  color: "#000",
  size: "$12",
});

export const Subtitle = styled(SizableText, {
  color: "#38434D",
  size: "$9",
});

const config = createTamagui({
  light: {
    color: {
      background: "gray",
      text: "black",
    },
  },
  defaultFont: "body",
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    Inter,
  },
  themes,
  tokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1440 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" },
  }),
});

type AppConfig = typeof config;

// Enable auto-completion of props shorthand (ex: jc="center") for Tamagui templates.
// Docs: https://tamagui.dev/docs/core/configuration

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
