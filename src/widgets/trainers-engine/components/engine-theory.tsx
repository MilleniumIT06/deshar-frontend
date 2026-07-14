'use client'
import { useAudioPlayer } from '@/shared/hooks/useAudioPlayer';
import { TrainerTitle } from '@/shared/ui/TrainerTitle';
import './../styles/styles.scss';

export const EngineTheory = ({description,title,audio}:{title:string;description:string;audio:string|null;}) => {
    const handleVoiceOver = useAudioPlayer(`/${audio}`);
    return (
        <div className='EngineTheory'>
            <TrainerTitle title={title} onVoiceOver={handleVoiceOver}/>
           <div className="EngineTheory__main">
             <div className='EngineTheory__description'>
                <p>{description}</p>
            </div>
           </div>
        </div>
    )
}
