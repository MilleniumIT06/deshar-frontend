import dynamic from 'next/dynamic'
import { type ComponentType } from 'react'

export type TrainerType =
	| 'accent_trainer'
	| 'alphabetic_sorter'
	| 'category_matcher'
	| 'colorize_words'
	| 'conclusion'
	| 'delete_extra_letter'
	| 'sequence_builder'
	| 'drop_word_to_image'
	| 'drop_word_to_text'
	| 'fix_sentence'
	| 'multi_quiz'
	| 'reorder_items'
	| 'single_quiz'
	| 'word_by_image'
	| 'word_picker'
	| 'single_select_image_quiz'
	| 'phrase_image_matcher'
	| 'drag_word_to_pocket'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trainersMap: Record<TrainerType, ComponentType<any>> = {
	'accent_trainer': dynamic(() => import('../../trainers/AccentTrainer').then(mod => mod.AccentTrainer), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'sequence_builder': dynamic(() => import('../../trainers/SequenceBuilder').then(mod => mod.SequenceBuilder), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'category_matcher': dynamic(() => import('../../trainers/CategoryMatcher').then(mod => mod.CategoryMatcher), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'drop_word_to_image': dynamic(() => import('../../trainers/DropWordToImage').then(mod => mod.DropWordToImage), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'drop_word_to_text': dynamic(() => import('../../trainers/DropWordToText').then(mod => mod.DropWordToText), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'colorize_words': dynamic(() => import('../../trainers/ColorizeWords').then(mod => mod.ColorizeWords), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'conclusion': dynamic(() => import('../../trainers/Conclusion').then(mod => mod.Conclusion), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'delete_extra_letter': dynamic(
		() => import('../../trainers/DeleteExtraLetter').then(mod => mod.DeleteExtraLetter),
		{ ssr: false, loading: () => <div>Loading...</div> },
	),
	'multi_quiz': dynamic(
		() => import('../../trainers/MultiSelectVariantsQuiz').then(mod => mod.MultiSelectVariantsQuiz),
		{ ssr: false, loading: () => <div>Loading...</div> },
	),
	'reorder_items': dynamic(() => import('../../trainers/ReorderItems').then(mod => mod.ReorderItems), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'single_quiz': dynamic(
		() => import('../../trainers/SingleSelectVariantQuiz').then(mod => mod.SingleSelectVariantQuiz),
		{ ssr: false, loading: () => <div>Loading...</div> },
	),
	'word_by_image': dynamic(() => import('../../trainers/WordByImage').then(mod => mod.WordByImage), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'word_picker': dynamic(() => import('../../trainers/WordPicker').then(mod => mod.WordPicker), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'alphabetic_sorter': dynamic(
		() => import('../../trainers/AlphabeticalSorter').then(mod => mod.AlphabeticalSorter),
		{ ssr: false, loading: () => <div>Loading...</div> },
	),
	'fix_sentence': dynamic(() => import('../../trainers/FixSentence').then(mod => mod.FixSentence), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'single_select_image_quiz': dynamic(
		() => import('../../trainers/SingleSelectImageQuiz').then(mod => mod.SingleSelectImageQuiz),
		{
			ssr: false,
			loading: () => <div>Loading...</div>,
		},
	),
	'phrase_image_matcher': dynamic(
		() => import('../../trainers/PhraseImageMatcher').then(mod => mod.PhraseImageMatcher),
		{
			ssr: false,
			loading: () => <div>Loading...</div>,
		},
	),
	'drag_word_to_pocket': dynamic(() => import('../../trainers/DragWordToPocket').then(mod => mod.DragWordToPocket), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
}
