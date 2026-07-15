'use client';
/* eslint-disable @next/next/no-img-element */
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

import { API_URL } from '@/config/api.config';
import { TrainerTitle } from '@/shared/ui/TrainerTitle';
import './../styles/styles.scss';

const sanitizeConfig = {
    ALLOWED_TAGS:['p','h2','h3','h4','h5','h6','span','div'],
    ALLOWED_ATTR:['class'],
}
export const EngineTheory = ({
    description,
    title,
    audio,
    image
}: {
    title: string;
    description: string;
    audio: string | null;
    image: string | null;
}) => {
    const imageUrl = `${API_URL.files()}${image}`;
    const [cleanHtml, setCleanHtml] = useState('');

    useEffect(() => {
        setCleanHtml(DOMPurify.sanitize(description,sanitizeConfig));
    }, [description]);

    return (
        <div className='EngineTheory'>
            <TrainerTitle title={title} audio={audio}/>
            {image ? (
                <div className='EngineTheory__image'>
                    <img src={imageUrl} alt={`${title}-изображение`}/>
                </div>
            ) : null}
            <div className="EngineTheory__main">
                <div className='EngineTheory__content'>
                    <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
                </div>
            </div>
        </div>
    );
};
