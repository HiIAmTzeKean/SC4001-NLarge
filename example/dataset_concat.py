
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
    LLM = 'llm'

def augment_data(dataset, percentage, mode=MODE.RANDOM):
    random_aug = RandomAugmenter()
    syn_aug = SynonymAugmenter()
    llm_aug = LLMAugmenter()

    num_samples = int(len(dataset) * percentage)
    sampled_data = dataset.shuffle(seed=42).select(range(num_samples))  # Sample randomly
    augmented_samples = []


    for data in sampled_data:
        words = data["text"].split()
        if len(words) < 2:  # Not enough words to swap
            continue 
        try:
            if (mode == 'random'):
                augmented_text = random_aug(data["text"], action=Action.SWAP)  # Apply random augmenter
            elif (mode == 'synonym'):
                augmented_text = syn_aug(data["text"], aug_src='wordnet', aug_p=0.3)  # Apply synonym augmenter
            elif (mode == 'llm'):
                augmented_text = llm_aug.paraphrase_with_question(data["text"])  # Apply llm augmenter
            augmented_samples.append({"text": augmented_text, "label": data["label"]})
        except ValueError as e:
            print(f"Skipping augmentation for text due to error: {e}")
    return augmented_samples