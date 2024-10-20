import { ColorSchemesSwitcher } from "@/components/color-schemes-switcher";
import { Logo } from "@/components/logo";
import { NavBar } from "@/components/navbar";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Box,
  Button,
  Group,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import Image from "next/image";

export default function Home() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShellHeader>
        <NavBar />
      </AppShellHeader>
      <AppShellMain>
        <Title className="text-center mt-20">
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: "purple", to: "pink" }}
          >
            NLarge
          </Text>
          <code>
            : A dataset augmentating tool for your Natural Language models.
          </code>
        </Title>
        <Text
          className="text-center text-gray-700 dark:text-gray-300 max-w-[500px] mx-auto mt-xl"
          ff="monospace"
          ta="center"
          size="md"
          maw={780}
          mx="auto"
          mt="xl"
        >
          This application is designed to solve the challenge of small natural
          language datasets. It automatically augments your data with proven
          methods to improve your model. To get started,
        </Text>

        <div className="flex justify-center mt-10 gap-5">
          <Button className="bg-purple-400 text-gray-900 dark:bg-purple-600 dark:text-gray-200">
            Try NLarge
          </Button>
          <Button className="bg-purple-400 text-gray-900 dark:bg-purple-600 dark:text-gray-200">
            Read Documentation
          </Button>
        </div>
      </AppShellMain>
    </AppShell>
  );
}
