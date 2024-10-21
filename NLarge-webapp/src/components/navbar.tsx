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
    <Group className="h-full px-16 justify-between">
      <Group
        className="w-auto dark:fill-blue"
        onClick={() => console.log("clicked")}
        style={{ cursor: "pointer" }}
      >
        <Logo
          width="50"
          height="50"
          stroke="4"
          color={isDark ? "#D0BCFF" : "#7363AD"}
        />
        <Text size="xl" fw={700} c="secondary">
          NLarge
        </Text>
      </Group>
      <Group>
        <ColorSchemesSwitcher />
        <Button variant="outline" size="compact-md" color="secondary">
          <GitHubLogoIcon />
        </Button>
        <Button variant="outline" size="compact-md" color="secondary">
          <HamburgerMenuIcon />
        </Button>
      </Group>
    </Group>
  );
}
