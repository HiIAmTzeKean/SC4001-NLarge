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
import { redirect } from "next/navigation";

export default function DocumentationMain() {
  redirect("/documentation/installation");
  return null;
}
