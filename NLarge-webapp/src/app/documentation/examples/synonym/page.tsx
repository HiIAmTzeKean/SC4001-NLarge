"use client";
import { CodeHighlightTabs } from "@mantine/code-highlight";
import {
  AppShellSection,
  Box,
  Code,
  Divider,
  Group,
  Image,
  rem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import clsx from "clsx";
import classes from "@/components/TableOfContents.module.css";
import { useEffect, useRef, useState } from "react";
import { IconListSearch } from "@tabler/icons-react";

const links = [
  { label: "Introduction", link: "#introduction", order: 1 },
  { label: "Importing & Initialization", link: "#import", order: 2 },
  { label: "Random Swap", link: "#randomswap", order: 1 },
  { label: "Random Substitute", link: "#randomsubstitute", order: 1 },
  { label: "Random Delete", link: "#randomdelete", order: 1 },
  { label: "Random Crop", link: "#randomcrop", order: 1 },
  { label: "Code Example ", link: "#exampleRNN", order: 1 },
  { label: "Library Imports", link: "#exampleRNN_import", order: 2 },
  { label: "Dataset Download", link: "#exampleRNN_download", order: 2 },
  { label: "Dataset Augmentation", link: "#exampleRNN_augment", order: 2 },
  { label: "RNN: Model training", link: "#exampleRNN_training", order: 2 },
  { label: "RNN: Evaluating performance", link: "#exampleRNN_eval", order: 3 },
  { label: "LSTM: Model training", link: "#exampleLSTM_training", order: 2 },
  {
    label: "LSTM: Evaluating performance",
    link: "#exampleLSTM_eval",
    order: 3,
  },
  { label: "Analysis of Results", link: "#example_analysis", order: 2 },
];

export default function ExampleSynonym() {
  const [TOCactive, setTOCactive] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]); // Store references to each section

  // Set active TOC item based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Update active TOC item based on visible section
            const sectionId = entry.target.id;
            setTOCactive(
              links.findIndex((link) => link.link === `#${sectionId}`),
            );
          }
        });
      },
      { threshold: 0.6 }, // Trigger when 60% of the section is visible
    );

    // Observe each section
    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Scroll to the respective section when TOC item is clicked
  const handleTOCClick = (link: string) => {
    const targetSection = document.querySelector(link);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.getBoundingClientRect().top + window.scrollY - 300, // Adjust scroll position with -80px offset for the header
        behavior: "smooth",
      });
    }
  };

  const items = links.map((item, index) => (
    <Box<"a">
      component="a"
      href={item.link}
      onClick={(event) => {
        event.preventDefault();
        handleTOCClick(item.link);
      }}
      key={item.label}
      className={clsx(classes.link, {
        [classes.linkActive]: TOCactive === index,
      })}
      style={{ paddingLeft: `calc(${item.order} * var(--mantine-spacing-md))` }}
    >
      {item.label}
    </Box>
  ));
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
              Synonym Augmenter
            </Title>
            <Text c="dimmed" size="lg">
              Detailed guide to using the Synonym Augmenter. This page also
              serves as a proof of concept for the Synonym Augmenter.
            </Text>
          </Stack>
        </Group>
        <Divider my="lg" />
      </AppShellSection>
      <AppShellSection className="flex justify-center pb-10">
        <div className="max-w-screen-lg  w-full flex space-x-8 ml-16">
          <Stack className="w-2/3">
            <Text c="primary" size="lg" fw="bolder">
              Introduction
            </Text>
            <div
              id="introduction"
              ref={(el) => {
                sectionRefs.current[0] = el;
              }}
            />
            <Text c="dimmed" size="md">
              The Synonym Augmenter enables data augmentation for text sentiment
              classification by introducing variability in text through synonym
              replacement. This augmenter enhances a dataset by augmenting words
              with their synonyms, which can improve model robustness by
              introducing semantic variability without changing a sentiment.
              <br />
              <br /> The Synonym Augmenter samples word in the target sequence
              with a predefined probability and replace it with a randomly
              chosen synonym from a set of synonyms of the sampled word.
              <br /> <br />
              <i>
                In the current version of NLarge, the set of synonyms can also
                be drawn from <Code bg="dimmed">WordNet</Code>, an extensive
                lexical database.
              </i>
            </Text>
            <Text c="primary" size="lg" fw="bolder">
              Key Components
            </Text>
            <div
              id="keyComponents"
              ref={(el) => {
                sectionRefs.current[1] = el;
              }}
            />
            <Text c="primary" size="md" fw="bolder">
              WordNet
            </Text>
            <Text c="dimmed" size="md">
              <Code bg="dimmed">WordNet</Code> provides synonym and antonym
              lookup, with optional parts of speech (POS) filtering. The POS
              tagging functionality identifies relevant grammatical structures
              for more accurate augmentation.
            </Text>
            <Text c="primary" size="md" fw="bolder">
              PartsOfSpeech
            </Text>
            <Text c="dimmed" size="md">
              Our POS functionality maps between POS tags and constituent tags
              to ensure compatibility with <Code bg="dimmed">WordNet</Code>'s
              POS requirements. <br /> <br />{" "}
              <i>
                The current version supports noun, verb, adjective and adverb
                classifications.
              </i>
            </Text>
            <Text c="primary" size="md" fw="bolder">
              SynonymAugmenter
            </Text>
            <Text c="dimmed" size="md">
              The augmenter uses the <Code bg="dimmed">WordNet</Code> class to
              perform augmentation by replacing words with synonyms based on
              user-defined criteria. It utilizes POS tagging to determine
              eligible words for substituition, while skip lists (stop words and
              regex patterns) can prevent certain words from being replaced.
            </Text>

            <Text c="primary" size="lg" fw="bolder">
              Import & Initialize NLarge Synonym Augmenter
            </Text>
            <Text c="dimmed" size="md">
              Before we proceed further, let us first import and initialize the
              SynonymAugmenter instance.
            </Text>
            <CodeHighlightTabs
              code={[
                {
                  fileName: "python",
                  code: `
from NLarge.synonym import SynonymAugmenter

syn_aug = SynonymAugmenter()
`,
                  language: "python",
                },
              ]}
              className="w-full rounded-sm outline-1 outline outline-slate-600"
            />

            <Text c="primary" size="xl" fw="bolder">
              Parameters
            </Text>
            <div
              id="params"
              ref={(el) => {
                if (el) {
                  sectionRefs.current[2] = el;
                }
              }}
            />
            <Group>
              <Code bg="dimmed">data</Code>
              <Text>
                (str) - Input text to augment
                <br /> <i>example: 'This is a test sentence.'</i>
              </Text>
            </Group>
            <Group>
              <Code bg="dimmed">aug_src</Code>
              <Text>
                (str) - Augmentation source, currently supports only "wordnet".{" "}
                <br />
                <i>default: 'wordnet'</i>
              </Text>
            </Group>
            <Group>
              <Code bg="dimmed">lang</Code>
              <Text>
                (str) - Language of the input text. <br /> <i>default: 'eng'</i>
              </Text>
            </Group>
            <Group>
              <Code bg="dimmed">aug_max</Code>
              <Text>
                (int) - Maximum number of words to augment.
                <br /> <i>default: 10</i>
              </Text>
            </Group>
            <Group>
              <Code bg="dimmed">aug_p</Code>
              <Text>
                (float) - Probability of augmenting each word. <br />{" "}
                <i>default: 0.3</i>
              </Text>
            </Group>
            <Group>
              <Code bg="dimmed">stopwords</Code>
              <Text>
                (list) - List of words to exclude from augmentation. <br />{" "}
                <i>default: None</i>
              </Text>
            </Group>
            <Group>
              <Code bg="dimmed">tokenizer</Code>
              <Text>
                (function) - Function to tokenize the input text. <br />{" "}
                <i>default: None</i>
              </Text>
            </Group>
            <Group>
              <Code bg="dimmed">reverse_tokenizer</Code>
              <Text>
                (function) - Function to detokenize the augmented text. <br />{" "}
                <i>default: None</i>
              </Text>
            </Group>
            <Text c="primary" size="xl" fw="bolder">
              Single Sentence Usage Example
            </Text>
            <CodeHighlightTabs
              code={[
                {
                  fileName: "python",
                  code: `
sample_text = "The quick brown fox jumps over the lazy dog."
print(sample_text)
syn_aug(sample_text, aug_src='wordnet', aug_p=0.3, aug_max=20)
                  `,
                  language: "python",
                },
                {
                  fileName: "output",
                  code: `
The quick brown fox jumps over the lazy dog.
'The quick brown fox leap over the faineant dog.'
                  `,
                  language: "python",
                },
              ]}
              className="w-full rounded-sm outline-1 outline outline-slate-600"
            />

            <Divider my={2} />

            <Text c="primary" size="xl" fw="bolder">
              Full Example of Synonym Augmentation
            </Text>
            <div
              id="exampleRNN"
              ref={(el) => {
                if (el) {
                  sectionRefs.current[6] = el;
                }
              }}
            />
            <Text c="dimmed" size="md">
              For your reference, below is a full example of the NLarge Synonym
              Argumentation on a dataset. This example will also function as a
              proof of concept for the NLarge Synonym Augmentation. This example
              will be evaluating augmented datasets on RNN and LSTM based on the
              loss and accuracy metrics. We have chosen the 'rotten tomatoes'
              dataset due to it's small size that is prone to overfitting.
            </Text>
            <Text c="primary" size="lg" fw="bolder">
              Importing libraries:
            </Text>
            <div
              id="exampleRNN_import"
              ref={(el) => {
                if (el) {
                  sectionRefs.current[7] = el;
                }
              }}
            />
            <CodeHighlightTabs
              code={[
                {
                  fileName: "python",
                  code: `
import datasets
from datasets import Dataset, Features, Value, concatenate_datasets
from NLarge.dataset_concat import augment_data, MODE
from NLarge.pipeline import TextClassificationPipeline
from NLarge.model.RNN import TextClassifierRNN, TextClassifierLSTM                  
                  `,
                  language: "python",
                },
              ]}
              className="w-full rounded-sm outline-1 outline outline-slate-600"
            />
            <Text c="primary" size="lg" fw="bolder">
              Downloading 'rotten-tomatoes' dataset
            </Text>
            <div
              id="exampleRNN_download"
              ref={(el) => {
                if (el) {
                  sectionRefs.current[8] = el;
                }
              }}
            />
            <Text c="dimmed" size="md">
              Here, we download the dataset and ensure that the features are in
              the correct format for our dataset augmentation later on.
            </Text>
            <CodeHighlightTabs
              code={[
                {
                  fileName: "python",
                  code: `
original_train_data, original_test_data = datasets.load_dataset(
"rotten_tomatoes", split=["train", "test"]
)  
features = Features({"text": Value("string"), "label": Value("int64")})
original_train_data = Dataset.from_dict(
    {
        "text": original_train_data["text"],
        "label": original_train_data["label"],
    },
    features=features,
)  
                  `,
                  language: "python",
                },
              ]}
              className="w-full rounded-sm outline-1 outline outline-slate-600"
            />

            <Text c="primary" size="lg" fw="bolder">
              Applying augmentation and enlarging dataset
            </Text>
            <div
              id="exampleRNN_augment"
              ref={(el) => {
                if (el) {
                  sectionRefs.current[9] = el;
                }
              }}
            />
            <Text c="dimmed" size="md">
              We will be performing a 100% Random Synonym Augmentation on the
              dataset. This would increase the dataset size by 100%.
            </Text>
            <CodeHighlightTabs
              code={[
                {
                  fileName: "python",
                  code: `
# Augment and increase size by 100%
percentage= {
    MODE.SYNONYM.WORDNET: 1.00,
}
augmented_synonym_100 = augment_data(original_train_data, percentage)

# Convert augmented data into Datasets
augmented_dataset_100 = Dataset.from_dict(
    {
        "text": [item["text"] for item in augmented_synonym_100],
        "label": [item["label"] for item in augmented_synonym_100],
    },
    features=features,
)

# Concatenate original and augmented datasets
augmented_train_data_100 = concatenate_datasets(
    [original_train_data, augmented_dataset_100]
)
                  `,
                  language: "python",
                },
              ]}
              className="w-full rounded-sm outline-1 outline outline-slate-600"
            />

            <Text c="primary" size="lg" fw="bolder">
              RNN: Loading the pipeline & model training
            </Text>
            <div
              id="exampleRNN_training"
              ref={(el) => {
                if (el) {
                  sectionRefs.current[10] = el;
                }
              }}
            />
            <Text c="dimmed" size="md">
              Here, we will initialize and train a baseline RNN pipeline with
              the un-augmented dataset and a RNN pipeline with the augmented
              dataset.
            </Text>
            <CodeHighlightTabs
              code={[
                {
                  fileName: "python",
                  code: `
pipeline_baseline = TextClassificationPipeline(
    augmented_data=original_train_data,
    test_data=original_test_data,
    max_length=128,
    test_size=0.2,
    model_class=TextClassifierRNN,
)
pipeline_augmented_100 = TextClassificationPipeline(
    augmented_data=augmented_train_data_100,
    test_data=original_test_data,
    max_length=128,
    test_size=0.2,
    model_class=TextClassifierRNN,
)
pipeline_baseline.train_model(n_epochs=10)
pipeline_augmented_100.train_model(n_epochs=10)
                  `,
                  language: "python",
                },
              ]}
              className="w-full rounded-sm outline-1 outline outline-slate-600"
            />

            <Text c="primary" size="lg" fw="bolder">
              RNN: Evaluating the models' performance
            </Text>
            <div
              id="exampleRNN_eval"
              ref={(el) => {
                if (el) {
                  sectionRefs.current[11] = el;
                }
              }}
            />
            <Text c="dimmed" size="md">
              Plotting the loss and accuracy graphs, we can visualize the
              performance improvements between the two amount of augmentation on
              RNN.
            </Text>
            <CodeHighlightTabs
              code={[
                {
                  fileName: "python",
                  code: `
pipeline_augmented_10.plot_loss(title="10% Random Substitute on RNN")
pipeline_augmented_100.plot_loss(title="100% Random Substitute on RNN")
pipeline_augmented_10.plot_acc(title="10% Random Substitute on RNN")
pipeline_augmented_100.plot_acc(title="100% Random Substitute on RNN")

                  `,
                  language: "python",
                },
              ]}
              className="w-full rounded-sm outline-1 outline outline-slate-600"
            />
            <Text c="dimmed" size="md">
              Looking at the graphs, we can see a stark improvement on both loss
              and accuracy of the RNN model.
            </Text>
            <Text c="primary" size="md">
              Models' Loss
            </Text>
            <Image src="/graphs/rnn_random_sub_10_loss.png" />
            <Image src="/graphs/rnn_random_sub_100_loss.png" />
            <Text c="primary" size="md">
              Models' Accuracy
            </Text>
            <Image src="/graphs/rnn_random_sub_10_acc.png" />
            <Image src="/graphs/rnn_random_sub_100_acc.png" />

            <Divider my={2} />

            <Text c="primary" size="lg" fw="bolder">
              LSTM: Loading the pipeline & model training
            </Text>
            <div
              id="exampleLSTM_training"
              ref={(el) => {
                if (el) {
                  sectionRefs.current[12] = el;
                }
              }}
            />
            <Text c="dimmed" size="md">
              Here, we will initialize and train the pipeline using LSTM and the
              augmented datasets.
            </Text>
            <CodeHighlightTabs
              code={[
                {
                  fileName: "python",
                  code: `
pipeline_augmented_10_LSTM = TextClassificationPipeline(
    augmented_data=augmented_train_data_10,
    test_data=original_test_data,
    max_length=128,
    test_size=0.2,
    model_class=TextClassifierLSTM,
)
pipeline_augmented_100_LSTM = TextClassificationPipeline(
    augmented_data=augmented_train_data_100,
    test_data=original_test_data,
    max_length=128,
    test_size=0.2,
    model_class=TextClassifierLSTM,
)
pipeline_augmented_10_LSTM.train_model(n_epochs=10)
pipeline_augmented_100_LSTM.train_model(n_epochs=10)
                  `,
                  language: "python",
                },
              ]}
              className="w-full rounded-sm outline-1 outline outline-slate-600"
            />

            <Text c="primary" size="lg" fw="bolder">
              LSTM: Evaluating the models' performance
            </Text>
            <div
              id="exampleLSTM_eval"
              ref={(el) => {
                if (el) {
                  sectionRefs.current[13] = el;
                }
              }}
            />
            <Text c="dimmed" size="md">
              Plotting the loss and accuracy graphs, we can visualize the
              performance improvements between the two amount of augmentation
              when used on LSTM.
            </Text>
            <CodeHighlightTabs
              code={[
                {
                  fileName: "python",
                  code: `
pipeline_augmented_10_LSTM.plot_loss(title="10% Random Substitute on LSTM")
pipeline_augmented_100_LSTM.plot_loss(title="100% Random Substitute on LSTM")
pipeline_augmented_10_LSTM.plot_acc(title="10% Random Substitute on LSTM")
pipeline_augmented_100_LSTM.plot_acc(title="100% Random Substitute on LSTM")

                  `,
                  language: "python",
                },
              ]}
              className="w-full rounded-sm outline-1 outline outline-slate-600"
            />
            <Text c="dimmed" size="md">
              Looking at the graphs, we can see a stark improvement on both loss
              and accuracy of the LSTM model.
            </Text>
            <Text c="primary" size="md">
              Models' Loss
            </Text>
            <Image src="/graphs/lstm_random_sub_10_loss.png" />
            <Image src="/graphs/lstm_random_sub_100_loss.png" />
            <Text c="primary" size="md">
              Models' Accuracy
            </Text>
            <Image src="/graphs/lstm_random_sub_10_acc.png" />
            <Image src="/graphs/lstm_random_sub_100_acc.png" />

            <Text c="primary" size="lg" fw="bolder">
              Analysis of Results
            </Text>
            <div
              id="example_analysis"
              ref={(el) => {
                if (el) {
                  sectionRefs.current[14] = el;
                }
              }}
            />
            <Text c="dimmed" size="md">
              The results of our experiment indicate that the performance of the
              models keeps increasing with higher levels of augmentation. This
              suggests that data augmentation provides a clear benefit for
              sentiment classification tasks. Additionally, the findings
              highlight the importance of data augmentation in enhancing the
              diversity and robustness of training datasets, leading to imporved
              model performance.
            </Text>
            <Text c="dimmed" size="md">
              The data augmentation techniques mitigates overfitting by
              effectively increasing the size of the training dataset, reducing
              the likelihood of the model memorizing specific examples and
              encouraging it to learn general patterns instead. The introduction
              of variations in the training data makes the model more robust to
              noise and variations in real world input data, which is crucial
              for achieving good performance on unseen data.
            </Text>
            <Divider my={2} />
          </Stack>

          <div className={clsx(classes.root, "w-1/4 sticky top-8")}>
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
                  transform: `translateY(calc(${TOCactive} * var(--link-height) + var(--indicator-offset)))`,
                }}
              />
              {items}
            </div>
          </div>
        </div>
      </AppShellSection>
    </>
  );
}
