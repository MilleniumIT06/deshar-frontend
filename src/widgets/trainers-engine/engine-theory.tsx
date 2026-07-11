import './styles.scss';

export const EngineTheory = ({description,title}:{title:string;description:string;}) => {
    return (
        <div className='EngineTheory'>
            <h1 className='EngineTheory__title'>{title}</h1>
            <div className='EngineTheory__description'>
                <p>{description}</p>
            </div>
        </div>
    )
}
