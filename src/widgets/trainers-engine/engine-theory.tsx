'use client'
import { TrainerTitle } from '@/shared/ui/TrainerTitle';
import './styles.scss';

export const EngineTheory = ({description,title}:{title:string;description:string;}) => {
    // const { isExpired, secondsLeft } = useCountdownTimer(10)
    return (
        <div className='EngineTheory'>
            {/* <h1 className='EngineTheory__title'>{title}</h1> */}
            <TrainerTitle title={title}/>
           <div className="EngineTheory__main">
             <div className='EngineTheory__description'>
                <p>{description}</p>
            </div>
           </div>
            {/* <div className="EngineTheory__footer">
                <div className='EngineTheory__footer-left-btns'>

						<Button variant="secondary" size="medium" className="EngineTheory__btn_back">
							Назад
						</Button>

						<Button variant="secondary" size="medium" className="EngineTheory__btn_skip" disabled={isRequired}>
							Пропустить
						</Button>
                </div>

{hasTasks ? (
        <Button
            className="trainers-engine__button"
            onClick={handleClickTasksBtn}
            size={"medium"}
            disabled={isExpired ? false : true}
        >
            Приступить к заданиям {isExpired ? '' : `(${secondsLeft})`}
        </Button>
    ) : (
        <Button
            className="trainers-engine__button"
            onClick={handleNextBtn}
            size={"medium"}
            disabled={isExpired ? false : true}
        >
           {isLastLesson?"Завершить": "Перейти на след урок"} {isExpired ? '' : `(${secondsLeft})`}
        </Button>
    )}
					</div> */}
        </div>
    )
}
