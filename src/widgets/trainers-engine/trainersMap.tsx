import dynamic from 'next/dynamic'
import { type ComponentType } from 'react'

export type TrainerType =
	| 'accent-trainer'
	| 'alphabetic-sorter'
	| 'category-matcher'
	| 'colorize-words'
	| 'conclusion'
	| 'delete-extra-letter'
	| 'sequence-builder'
	| 'drop-word-to-image'
	| 'drop-word-to-text'
	| 'fix-sentence'
	| 'multi-quiz'
	| 'reorder-items'
	| 'single-quiz'
	| 'word-by-image'
	| 'word-picker'
	| 'single-select-image-quiz'
	| 'phrase-image-matcher'
	| 'drag-word-to-pocket'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trainersMap: Record<TrainerType, ComponentType<any>> = {
	'accent-trainer': dynamic(() => import('../../trainers/AccentTrainer').then(mod => mod.AccentTrainer), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'sequence-builder': dynamic(() => import('../../trainers/SequenceBuilder').then(mod => mod.SequenceBuilder), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'category-matcher': dynamic(() => import('../../trainers/CategoryMatcher').then(mod => mod.CategoryMatcher), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'drop-word-to-image': dynamic(() => import('../../trainers/DropWordToImage').then(mod => mod.DropWordToImage), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'drop-word-to-text': dynamic(() => import('../../trainers/DropWordToText').then(mod => mod.DropWordToText), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'colorize-words': dynamic(() => import('../../trainers/ColorizeWords').then(mod => mod.ColorizeWords), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	conclusion: dynamic(() => import('../../trainers/Conclusion').then(mod => mod.Conclusion), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'delete-extra-letter': dynamic(
		() => import('../../trainers/DeleteExtraLetter').then(mod => mod.DeleteExtraLetter),
		{ ssr: false, loading: () => <div>Loading...</div> },
	),
	'multi-quiz': dynamic(
		() => import('../../trainers/MultiSelectVariantsQuiz').then(mod => mod.MultiSelectVariantsQuiz),
		{ ssr: false, loading: () => <div>Loading...</div> },
	),
	'reorder-items': dynamic(() => import('../../trainers/ReorderItems').then(mod => mod.ReorderItems), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'single-quiz': dynamic(
		() => import('../../trainers/SingleSelectVariantQuiz').then(mod => mod.SingleSelectVariantQuiz),
		{ ssr: false, loading: () => <div>Loading...</div> },
	),
	'word-by-image': dynamic(() => import('../../trainers/WordByImage').then(mod => mod.WordByImage), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'word-picker': dynamic(() => import('../../trainers/WordPicker').then(mod => mod.WordPicker), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'alphabetic-sorter': dynamic(
		() => import('../../trainers/AlphabeticalSorter').then(mod => mod.AlphabeticalSorter),
		{ ssr: false, loading: () => <div>Loading...</div> },
	),
	'fix-sentence': dynamic(() => import('../../trainers/FixSentence').then(mod => mod.FixSentence), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
	'single-select-image-quiz': dynamic(
		() => import('../../trainers/SingleSelectImageQuiz').then(mod => mod.SingleSelectImageQuiz),
		{
			ssr: false,
			loading: () => <div>Loading...</div>,
		},
	),
	'phrase-image-matcher': dynamic(
		() => import('../../trainers/PhraseImageMatcher').then(mod => mod.PhraseImageMatcher),
		{
			ssr: false,
			loading: () => <div>Loading...</div>,
		},
	),
	'drag-word-to-pocket': dynamic(() => import('../../trainers/DragWordToPocket').then(mod => mod.DragWordToPocket), {
		ssr: false,
		loading: () => <div>Loading...</div>,
	}),
}
