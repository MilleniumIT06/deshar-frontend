import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import './styles.scss'
import { Pocket } from './pocket'

const Icon = () => (
	<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M11.1243 18.1801C11.1243 18.5792 10.9004 18.9419 10.5499 19.1111C10.4144 19.1771 10.2692 19.209 10.125 19.209C9.89658 19.209 9.67029 19.1282 9.4875 18.9721L4.02569 14.3107H1.11673C0.565063 14.3112 0.117676 13.8502 0.117676 13.282V9.18256C0.117676 8.61414 0.565063 8.15336 1.11673 8.15336H4.02593L9.48774 3.49204C9.78615 3.2373 10.2 3.18299 10.5502 3.35347C10.9004 3.52272 11.1245 3.8856 11.1245 4.28451L11.1243 18.1801ZM14.9637 16.5722C14.9394 16.5739 14.916 16.5749 14.8919 16.5749C14.628 16.5749 14.3735 16.4675 14.1855 16.2737L14.0519 16.1356C13.7015 15.7754 13.6604 15.2048 13.9555 14.7951C14.7036 13.7562 15.0985 12.5246 15.0985 11.2327C15.0985 9.84303 14.6502 8.53962 13.8018 7.46318C13.4788 7.05403 13.5085 6.4598 13.8706 6.08718L14.0039 5.94958C14.2035 5.74404 14.471 5.63201 14.7604 5.64979C15.0422 5.6644 15.3054 5.80103 15.4842 6.02606C16.6611 7.5092 17.2827 9.30993 17.2827 11.2329C17.2827 13.0239 16.733 14.7287 15.6925 16.1621C15.5187 16.401 15.2529 16.5511 14.9637 16.5722ZM19.0943 19.7521C18.9136 19.972 18.6523 20.104 18.3726 20.1162C18.3589 20.1167 18.3449 20.1172 18.3307 20.1172C18.0661 20.1172 17.8122 20.0095 17.6242 19.8159L17.4929 19.6808C17.1262 19.3033 17.1014 18.6996 17.4348 18.2909C19.046 16.3173 19.9337 13.8108 19.9337 11.2327C19.9337 8.55106 18.9834 5.96955 17.2584 3.96377C16.9086 3.55658 16.9264 2.94018 17.2986 2.55539L17.4296 2.42023C17.6239 2.21906 17.8765 2.10825 18.1662 2.11775C18.4412 2.12579 18.7013 2.25097 18.8841 2.46285C20.9692 4.88069 22.1177 7.99555 22.1177 11.2327C22.1181 14.3473 21.0444 17.373 19.0943 19.7521Z"
			fill="white"
		/>
	</svg>
)
export const DragWordToPocket = () => {
	return (
		<div className="DragWordToPocket">
			<TrainerTitle title="test" />
			<div className="DragWordToPocket__variants">
				<div className="DragWordToPocketVariant">
					<button className="DragWordToPocketVariant__btn">
						<Icon />
					</button>
					<span>Кошка</span>
				</div>
				<div className="DragWordToPocketVariant">
					<button className="DragWordToPocketVariant__btn">
						<Icon />
					</button>
					<span>Кошка</span>
				</div>
				<div className="DragWordToPocketVariant">
					<button className="DragWordToPocketVariant__btn">
						<Icon />
					</button>
					<span>Кошка</span>
				</div>
				<div className="DragWordToPocketVariant">
					<button className="DragWordToPocketVariant__btn">
						<Icon />
					</button>
					<span>Кошка</span>
				</div>
			</div>
			<div className="DragWordToPocket__pockets">
				<Pocket />
			</div>
		</div>
	)
}
