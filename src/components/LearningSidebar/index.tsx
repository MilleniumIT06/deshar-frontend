'use client'
import { Button } from '@/shared/ui/Button'

import { AttestationItem } from '../AttestationItem'
import { LessonItem } from '../LessonItem'

import styles from './styles.module.scss'

export const LearningSidebar = () => {
	const t = () => {
		console.log('test')
	}
	return (
		<div className={styles.index}>
			<div className={styles.inner}>
				<h5 className={styles.title}>Уроки</h5>
				<div className={styles.content}>
					<ul className={styles.list}>
						<LessonItem
							id={1}
							active={false}
							completed={true}
							number={1}
							text="Морфемика как раздел лингвистики"
							handleClick={t}
						/>
						<LessonItem
							id={2}
							active={false}
							completed={true}
							number={2}
							text="Состав слова. Морфемный анализ слов"
							handleClick={t}
						/>
						<LessonItem
							id={3}
							active={true}
							completed={false}
							number={3}
							text="Орфография как система правил правописания слов и форм слов"
							handleClick={t}
						/>
						<LessonItem
							id={4}
							active={false}
							completed={false}
							number={4}
							text="Правописание разделительных Ъ и Ь"
							handleClick={t}
						/>
						<LessonItem
							id={5}
							active={false}
							completed={false}
							number={5}
							text="Правописание корней с безударными проверяемыми, непроверяемыми гласными"
							handleClick={t}
						/>
						<LessonItem
							id={6}
							active={false}
							completed={false}
							number={6}
							text="Правописание корней с проверяемыми, непроверяемыми, непроизносимыми согласными"
							handleClick={t}
						/>
					</ul>
					<Button className={styles.showBtn} variant="secondary" size="medium" fullWidth>Показать следующие</Button>
				</div>
				<div className={styles.bottom}>
					<h5 className={styles.title}>Аттестация</h5>
					<AttestationItem current={2} max={5} />
				</div>
			</div>
		</div>
	)
}
