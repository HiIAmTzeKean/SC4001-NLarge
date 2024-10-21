import { Divider, Text, Title } from "@mantine/core";

type props = {
  className?: String;
  sectionsRefs: React.MutableRefObject<HTMLDivElement[]>;
};

export function Documentation({ className, sectionsRefs }: props) {
  return (
    <div className={"" + className}>
      <div
        ref={(el) => {
          if (el) {
            sectionsRefs.current[0] = el; // Assign the element to the array
          }
        }}
        id="data-augmentation"
      >
        <Title c="primary" ff="monospace" fw="bolder" my="xl" ta="left">
          Data Augmentation for Natural Language Processing
        </Title>
        <Text c="dimmed" size="lg">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Urna habitant
          adipiscing tristique mattis praesent parturient aliquet suspendisse.
          Ut urna amet arcu ex ligula. Purus amet porta sociosqu porta ac et
          velit. Porta enim donec ex elementum commodo nunc lectus fames. Nunc
          porta pharetra quisque vivamus tempus rutrum congue donec turpis.
          Vestibulum orci torquent erat phasellus quis mus. Sem curae
          pellentesque; libero cursus malesuada diam. Parturient dis tempor
          condimentum condimentum nibh. Fusce proin nec arcu; quis dictum nulla.
          Velit dolor fringilla dictum suspendisse in nisl. Cursus dignissim
          lacinia; iaculis aptent scelerisque sit. Phasellus vitae pulvinar
          tellus vestibulum fusce maximus. Taciti proin neque senectus vivamus
          maximus finibus. Consequat cubilia ullamcorper ac; eleifend natoque
          nisl. Quisque ex arcu maecenas, enim malesuada gravida nascetur non
          consequat. Egestas consectetur varius luctus dolor consectetur in
          augue.
        </Text>
        <Divider color="primary" my="lg" />
      </div>
      <div
        ref={(el) => {
          if (el) {
            sectionsRefs.current[1] = el;
          }
        }}
        id="why-does-it-matter"
      >
        <Title c="primary" ff="monospace" fw="bolder" my="xl" ta="left">
          Why does it matter?
        </Title>
        <Text c="dimmed" size="lg">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Urna habitant
          adipiscing tristique mattis praesent parturient aliquet suspendisse.
          Ut urna amet arcu ex ligula. Purus amet porta sociosqu porta ac et
          velit. Porta enim donec ex elementum commodo nunc lectus fames. Nunc
          porta pharetra quisque vivamus tempus rutrum congue donec turpis.
          Vestibulum orci torquent erat phasellus quis mus. Sem curae
          pellentesque; libero cursus malesuada diam. Parturient dis tempor
          condimentum condimentum nibh. Fusce proin nec arcu; quis dictum nulla.
          Velit dolor fringilla dictum suspendisse in nisl. Cursus dignissim
          lacinia; iaculis aptent scelerisque sit. Phasellus vitae pulvinar
          tellus vestibulum fusce maximus. Taciti proin neque senectus vivamus
          maximus finibus. Consequat cubilia ullamcorper ac; eleifend natoque
          nisl. Quisque ex arcu maecenas, enim malesuada gravida nascetur non
          consequat. Egestas consectetur varius luctus dolor consectetur in
          augue.
        </Text>
        <Divider color="primary" my="lg" />
      </div>
      <div
        ref={(el) => {
          if (el) {
            sectionsRefs.current[2] = el; // Assign the element to the array
          }
        }}
        id="types-of-data-aug"
      >
        <Title c="primary" ff="monospace" fw="bolder" my="xl" ta="left">
          Types of data augmentation
        </Title>
        <Text c="dimmed" size="lg">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Urna habitant
          adipiscing tristique mattis praesent parturient aliquet suspendisse.
          Ut urna amet arcu ex ligula. Purus amet porta sociosqu porta ac et
          velit.{" "}
        </Text>
      </div>
      <div
        ref={(el) => {
          if (el) {
            sectionsRefs.current[3] = el; // Assign the element to the array
          }
        }}
        id="aug-1"
      >
        <Title
          c="primary"
          ff="monospace"
          fw="bolder"
          my="xl"
          order={2}
          ta="left"
        >
          Augmentation 1
        </Title>
        <Text c="dimmed" size="lg">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Urna habitant
          adipiscing tristique mattis praesent parturient aliquet suspendisse.
          Ut urna amet arcu ex ligula. Purus amet porta sociosqu porta ac et
          velit.
        </Text>
      </div>
      <div
        ref={(el) => {
          if (el) {
            sectionsRefs.current[4] = el; // Assign the element to the array
          }
        }}
        id="aug-2"
      >
        <Title
          c="primary"
          ff="monospace"
          fw="bolder"
          my="xl"
          order={2}
          ta="left"
        >
          Augmentation 2
        </Title>
        <Text c="dimmed" size="lg">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Urna habitant
          adipiscing tristique mattis praesent parturient aliquet suspendisse.
          Ut urna amet arcu ex ligula. Purus amet porta sociosqu porta ac et
          velit.
        </Text>
      </div>
      <div
        ref={(el) => {
          if (el) {
            sectionsRefs.current[5] = el; // Assign the element to the array
          }
        }}
        id="aug-3"
      >
        <Title
          c="primary"
          ff="monospace"
          fw="bolder"
          my="xl"
          order={2}
          ta="left"
        >
          Augmentation 3
        </Title>
        <Text c="dimmed" size="lg">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Urna habitant
          adipiscing tristique mattis praesent parturient aliquet suspendisse.
          Ut urna amet arcu ex ligula. Purus amet porta sociosqu porta ac et
          velit.
        </Text>
      </div>
    </div>
  );
}
