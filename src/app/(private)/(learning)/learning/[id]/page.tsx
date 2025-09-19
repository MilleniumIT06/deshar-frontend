import { LearningContent } from '@/components/LearningContent'
import { LearningTopBar } from '@/components/LearningTopBar'

import './../../../styles.scss'

export default async function Learning() {
	return (
		<div className="LearningPage">
			<LearningTopBar />
			<LearningContent />
		</div>
	)
}
