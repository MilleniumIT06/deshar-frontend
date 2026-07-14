/* eslint-disable @next/next/no-img-element */

import { API_URL } from '@/config/api.config';
import { TrainerTitle } from '@/shared/ui/TrainerTitle';
import './../styles/styles.scss';

export const EngineTheory = ({description,title,audio,image}:{title:string;description:string;audio:string|null;image:string|null}) => {
    const imageUrl = `${API_URL.files()}${image}`
    return (
        <div className='EngineTheory'>
            <TrainerTitle title={title} audio={audio}/>
            {image?<div className='EngineTheory__image'>
                <img src={imageUrl} alt={`${title}-изображение`}/>
            </div>:null}
           <div className="EngineTheory__main">
             <div className='EngineTheory__description'>
                <p>{description}</p>
            </div>
           </div>
        </div>
    )
}
