"use client";

import { Button, Group, Text, useMantineColorScheme } from "@mantine/core";
import { Logo } from "./logo";
import { ColorSchemesSwitcher } from "./color-schemes-switcher";
import { GitHubLogoIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

export function NavBar() {
  const { colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const isDark = colorScheme === "dark";
  return (
    <Group className="h-full px-md justify-between">
      <Group
        className="w-auto dark:fill-blue"
        onClick={() => console.log("clicked")}
        style={{ cursor: "pointer" }}
      >
        <Logo
          width="50"
          height="50"
          stroke="4"
          color={isDark ? "#fff" : "#000"}
        />
        <Text size="xl" fw={700}>
          NLarge
        </Text>
      </Group>
      <Group>
        <ColorSchemesSwitcher />
        <Button
          variant="outline"
          size="compact-md"
          className="border-purple-400 text-gray-900 dark:border-purple-600 dark:text-gray-200"
        >
          <GitHubLogoIcon />
        </Button>
        <Button className="bg-purple-400 text-gray-900 dark:bg-purple-600 dark:text-gray-200">
          <HamburgerMenuIcon />
        </Button>
      </Group>
    </Group>
  );
}
