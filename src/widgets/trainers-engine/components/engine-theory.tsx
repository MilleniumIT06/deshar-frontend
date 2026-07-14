'use client'
import { TrainerTitle } from '@/shared/ui/TrainerTitle';
import './../styles/styles.scss';

export const EngineTheory = ({description,title}:{title:string;description:string;}) => {
    return (
        <div className='EngineTheory'>
            <TrainerTitle title={title}/>
           <div className="EngineTheory__main">
             <div className='EngineTheory__description'>
                <p>{description}</p>
            </div>
           </div>
        </div>
    )
}
