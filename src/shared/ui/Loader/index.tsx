import cn from 'classnames';
import './styles.scss';

export const Loader=({size="large"}:{size?:"small"|"medium"|"large"})=> {
  return (
    <div className="Loader__overlay">
      <div className="Loader__spinnerContainer">
        <div className={cn("Loader__outerRing",size)}/>
      </div>
    </div>
  );
}
