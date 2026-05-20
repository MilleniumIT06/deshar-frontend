import './item.scss'

interface FixSentenceItemProps {
	words: string[]
	itemHeight?: number
	selectedIndex: number
	onSelect: (index: number) => void
}

export const FixSentenceItem = ({ words, itemHeight = 48, selectedIndex, onSelect }: FixSentenceItemProps) => {
	const onClickWord = () => {
		const nextIndex = selectedIndex >= words.length - 1 ? 0 : selectedIndex + 1
		onSelect(nextIndex)
	}

	return (
		<div className="fix-sentence-item" onClick={onClickWord} role="button" tabIndex={0}>
			<div className="fix-sentence-item__viewport" style={{ height: `${itemHeight}px` }}>
				<div
					className="fix-sentence-item__wheel"
					style={{ transform: `translateY(-${selectedIndex * itemHeight}px)` }}>
					{words.map((word, index) => (
						<span
							key={`${word}-${index}`}
							className="fix-sentence-item__word"
							style={{ height: `${itemHeight}px` }}>
							{word}
						</span>
					))}
				</div>
			</div>
		</div>
	)
}
