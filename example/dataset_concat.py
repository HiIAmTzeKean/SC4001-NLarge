
from NLarge.random import RandomAugmenter
from NLarge.random import Action
from NLarge.synonym import SynonymAugmenter
from NLarge.llm import LLMAugmenter

class MODE:
    """
    Mode class to define the types of mode that can be performed to enlarge dataset.
    
    RANDOM: use random augmentater
    SYNONYM: use synonym augmentater
    LLM: use llm augmentater
    """
    RANDOM = 'random'
    SYNONYM = 'synonym'
    LLM_PARAPHRASE = 'llm.paraphrase'
    LLM_SUMMARIZE = 'llm.summary'

def augment_data(dataset, percentages):
    """
    Augments dataset using different techniques with specified percentage allocation for each technique.
    
    Parameters:
    - dataset: the original dataset to augment
    - percentages: a dictionary where keys are augmentation modes (from MODE) and values are the percentages allocated for each mode.
    
    Returns:
    - A list of augmented samples.
    """
    random_aug = RandomAugmenter()
    syn_aug = SynonymAugmenter()
    llm_aug = LLMAugmenter()

    total_percentage = sum(percentages.values())
    if total_percentage > 1.0:
        raise ValueError("Total percentage for augmentation exceeds 100%.")
    
    augmented_samples = []
    start = 0
    shuffled_dataset = dataset.shuffle(seed=42)
    dataset_size = len(dataset)
    
    for mode, percentage in percentages.items():
        num_samples = int(dataset_size * percentage)
        mode_subset = shuffled_dataset.select(range(start, start + num_samples))
        start += num_samples  # Move start index for the next subset

        for data in mode_subset:
            words = data["text"].split()
            if len(words) < 2:  # Skip samples with too few words
                continue
            try:
                if mode == MODE.RANDOM:
                    augmented_text = random_aug(data["text"], action=Action.SWAP)
                elif mode == MODE.SYNONYM:
                    augmented_text = syn_aug(data["text"], aug_src='wordnet', aug_p=0.3)
                elif mode == MODE.LLM_PARAPHRASE:
                    augmented_text = llm_aug.paraphrase_with_question(data["text"], max_new_tokens=20)
                elif mode == MODE.LLM_SUMMARIZE:
                    augmented_text = llm_aug.summarize_with_summarizer(data["text"])
                
                augmented_samples.append({"text": augmented_text, "label": data["label"]})
            except ValueError as e:
                print(f"Skipping augmentation for text due to error: {e}")
    
    return augmented_samples