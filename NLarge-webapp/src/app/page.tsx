"use client";

import { Documentation } from "@/components/documentation";
import { NavBar } from "@/components/navbar";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellSection,
  Box,
  Button,
  Divider,
  Group,
  rem,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { IconListSearch } from "@tabler/icons-react";
import clsx from "clsx";
import classes from "@/components/TableOfContents.module.css";
import React, { useEffect } from "react";

const tableOfContents = [
  {
    label: "Data Augmentation for Natural Language Processing",
    link: "#data-augmentation",
    order: 1,
  },
  { label: "Why does it matter?", link: "#why-does-it-matter", order: 1 },
  { label: "Types of data augmentation", link: "#types-of-data-aug", order: 1 },
  { label: "Augmentation 1", link: "#aug-1", order: 2 },
  { label: "Augmentation 2", link: "#aug-2", order: 2 },
  { label: "Augmentation 3", link: "#aug-3", order: 2 },
];

export default function Home() {
  const [active, setActive] = React.useState(2);
  const sectionsRefs = React.useRef<HTMLDivElement[]>([]);

  const handleClick = (index: number, link: string) => {
    setActive(index);
    const targetElement = document.querySelector(link);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Add observer to detect section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRefs.current.findIndex(
              (section) => section === entry.target,
            );
            if (index !== -1) {
              setActive(index); // Update active state when section is visible
            }
          }
        });
      },
      { rootMargin: "0px 0px -50% 0px", threshold: 0.1 }, // Trigger when 10% of the section is in view
    );

    // Observe all sections
    sectionsRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const items = tableOfContents.map((item, index) => (
    <Box<"a">
      component="a"
      href={item.link}
      onClick={(event) => {
        event.preventDefault();
        handleClick(index, item.link);
      }}
      key={item.label}
      className={clsx(classes.link, { [classes.linkActive]: active === index })}
      style={{ paddingLeft: `calc(${item.order} * var(--mantine-spacing-md))` }}
    >
      {item.label}
    </Box>
  ));

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShellHeader>
        <NavBar />
      </AppShellHeader>
      <AppShellMain className="px-24 ">
        <div className="flex justify-between">
          <Box className="max-w-4xl min-w-3xl">
            <Title className="text-left mt-16">
              <Text
                inherit
                variant="gradient"
                component="span"
                gradient={{ from: "tertiary1", to: "tertiary2" }}
              >
                NLarge
              </Text>
              <Text inherit c="primary" ff="monospace">
                A dataset augmentation tool for your Natural Language models.
              </Text>
            </Title>
            <Text
              className="max-w-[500px] mt-xl"
              ff="monospace"
              c="dimmed"
              ta="left"
              size="md"
              maw={780}
              mt="xl"
            >
              This application is designed to solve the challenge of small
              natural language datasets. It automatically augments your data
              with proven methods to improve your model. To get started,
            </Text>

            <div className="mt-10 gap-5">
              <Button
                variant="gradient"
                size="xl"
                gradient={{ from: "tertiary1", to: "tertiary2", deg: 152 }}
              >
                Try NLarge
              </Button>
            </div>
          </Box>
          <Box className="pt-36">
            <Skeleton height={480} width={450} radius={5} />
          </Box>
        </div>
        <Stack pt="sm" align="center" justify="center" gap="xs" c="primary">
          <Text ff="monospace" c="primary">
            Read more
          </Text>
          <ArrowDownIcon />
        </Stack>
      </AppShellMain>
      <AppShellSection bg="bg2" className="px-24 py-8">
        <Group align="start" justify="space-between">
          <Box className="w-[65%]">
            <Documentation sectionsRefs={sectionsRefs} />
          </Box>
          <div className={classes.root}>
            <Group mb="md">
              <IconListSearch
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
              <Text>Table of contents</Text>
            </Group>
            <div className={classes.links}>
              <div
                className={classes.indicator}
                style={{
                  transform: `translateY(calc(${active} * var(--link-height) + var(--indicator-offset)))`,
                }}
              />
              {items}
            </div>
          </div>
        </Group>
      </AppShellSection>
      <AppShellSection>
        <Divider mb="sm" />
        <Group justify="space-between" className="px-16 py-4">
          <Text ff="monospace" c="dimmed" size="sm">
            © 2024 NLarge. All rights reserved
          </Text>
          <Text ff="monospace" c="dimmed" size="sm">
            Created as part of SC4001 Neural Network & Deep Learning
          </Text>
        </Group>
      </AppShellSection>
    </AppShell>
  );
}
