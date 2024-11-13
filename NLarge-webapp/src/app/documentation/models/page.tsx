import {
  AppShellSection,
  Divider,
  Group,
  rem,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";

export default function DocumentationModels() {
  return (
    <>
      <AppShellSection className="pt-10" bg="bg2">
        <Group justify="center">
          <Stack className="w-3/4 p-2 pb-10">
            <Title
              c="primary"
              ff="monospace"
              size={rem(42)}
              fw="bolder"
              mt="xl"
              ta="left"
            >
              Language Models
            </Title>
            <Text c="dimmed" size="lg">
              For your convenience, we have included some ready-to-use Neural
              Network Models in NLarge.
            </Text>
          </Stack>
        </Group>
        <Divider my="lg" />
      </AppShellSection>
      <AppShellSection className="">
        <Group justify="center">
          <Group className="w-3/4">
            <Skeleton h="850" w="100%" />
          </Group>
        </Group>
      </AppShellSection>
    </>
  );
}
