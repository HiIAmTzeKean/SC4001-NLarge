import { CodeHighlightTabs } from "@mantine/code-highlight";
import {
  AppShellSection,
  Code,
  Divider,
  Group,
  List,
  ListItem,
  rem,
  Stack,
  Text,
  Title,
} from "@mantine/core";

export default function DocumentationHelper() {
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
              Helper Functions/Classes
            </Title>
            <Text c="dimmed" size="lg">
              Here are some helper functions and classes we designed to aid the
              usage of NLarge in a DNN usage.
            </Text>
          </Stack>
        </Group>
        <Divider my="lg" />
      </AppShellSection>
      <AppShellSection className="pb-10">
        <Group justify="center">
          <Group className="w-2/3">
            <Stack>
              <Text c="primary" size="lg" fw="bolder">
                Dataset Concat
              </Text>
              <Text c="dimmed" size="md">
                You may import the <Code bg="dimmed">augment_data</Code>{" "}
                function and the <Code bg="dimmed">MODE</Code> class from this
                library file.
              </Text>
              <Divider my={2} />
              <Text c="primary" size="lg" fw="bolder">
                MODE class
              </Text>
              <Text c="dimmed" size="md">
                The <Code bg="dimmed">MODE</Code> class categorizes the
                available augmentation techniques in NLarge. It is used with the{" "}
                <Code bg="dimmed">augment_data</Code> function.
              </Text>
              <Text c="primary" size="md" fw="bolder">
                Augmentation Modes
              </Text>
              <List>
                <ListItem>
                  <Code bg="dimmed" fz="sm">
                    RANDOM
                  </Code>
                  <List withPadding listStyleType="disc" className="pt-2">
                    <ListItem>
                      <Text c="dimmed" size="md">
                        <Code bg="dimmed" fz="sm">
                          SWAP
                        </Code>{" "}
                        : Swaps words within the text.
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text c="dimmed" size="md">
                        <Code bg="dimmed" fz="sm">
                          SUBSTITUTE
                        </Code>{" "}
                        : Substitutes words with other words.
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text c="dimmed" size="md">
                        <Code bg="dimmed" fz="sm">
                          DELETE
                        </Code>{" "}
                        : Deletes certain words from the text.
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text c="dimmed" size="md">
                        <Code bg="dimmed" fz="sm">
                          CROP
                        </Code>{" "}
                        : Trims the text.
                      </Text>
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem className="pt-2">
                  <Code bg="dimmed" fz="sm">
                    SYNONYM
                  </Code>
                  <List withPadding listStyleType="disc" className="pt-2">
                    <ListItem>
                      <Text c="dimmed" size="md">
                        <Code bg="dimmed" fz="sm">
                          WORDNET
                        </Code>{" "}
                        : Replaces words with synonyms from WordNet.
                      </Text>
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem className="pt-2">
                  <Code bg="dimmed" fz="sm">
                    LLM
                  </Code>
                  <List withPadding listStyleType="disc" className="pt-2">
                    <ListItem>
                      <Text c="dimmed" size="md">
                        <Code bg="dimmed" fz="sm">
                          PARAPHRASE
                        </Code>{" "}
                        : Paraphrases the text using a language model.
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text c="dimmed" size="md">
                        <Code bg="dimmed" fz="sm">
                          SUMMARIZE
                        </Code>{" "}
                        : Summarize the text using a language model.
                      </Text>
                    </ListItem>
                  </List>
                </ListItem>
              </List>

              <Divider my={2} />

              <Text c="primary" size="lg" fw="bolder">
                augment_data Function
              </Text>
              <Text c="dimmed" size="md">
                The <Code bg="dimmed">augment_data</Code> function enables the
                generation of new samples from an existing dataset using the
                augmentation techniques provided in NLarge, including random
                transformations, synonym replacement, and language model-based
                paraphrasing or summarization. This function allows users to
                specify percentages for different augmentation modes and stack
                multiple augmentation modes to diversify and enlarge the
                dataset, which can help improve model robustness and prevent
                overfitting.
              </Text>
              <Text c="primary" size="md" fw="bolder">
                Parameters
              </Text>
              <Group>
                <Text>
                  <Code bg="dimmed">dataset</Code> <i>(Dataset)</i>
                </Text>
                <Text c="dimmed">
                  The original dataset to augment, structured with at least two
                  fields: "text" for the input text and "label" for associated
                  labels.
                </Text>
              </Group>
              <Group>
                <Text>
                  <Code bg="dimmed">percentages</Code> <i>(dict)</i>
                </Text>
                <Text c="dimmed">
                  A dictionary specifying the augmentation techniques to apply
                  and the percentages of data to be augmented by each technique.
                  Keys are augmentation modes (from the{" "}
                  <Code bg="dimmed">MODE</Code> class) and values ate float
                  numbers representing the percentage of samples for each
                  augmentation.
                </Text>
              </Group>
              <Text c="primary" size="md" fw="bolder">
                Returns
              </Text>
              <Text c="dimmed" size="md">
                The function returns a list of augmented dataset samples. Each
                sample is a dictionary with "text" (augmented text) and "label"
                (original label) fields.
              </Text>

              <Text c="primary" size="md" fw="bolder">
                Example Usage:
              </Text>
              <CodeHighlightTabs
                code={[
                  {
                    fileName: "python",
                    code: `
from NLarge.dataset_concat import augment_data, MODE

# Augment and increase size by 100%
percentages = {
    MODE.RANDOM.SUBSTITUTE: 0.5,  # 50% of data for random augmentation
    MODE.SYNONYM.WORDNET: 0.5,  # 50% of data for synonym augmentation
}

augmented_data_list = augment_data(original_train_data, percentages)
                    `,
                    language: "python",
                  },
                ]}
                className="w-full rounded-sm outline-1 outline outline-slate-600"
              />
              <Divider my={2} />
            </Stack>
          </Group>
        </Group>
      </AppShellSection>
    </>
  );
}
