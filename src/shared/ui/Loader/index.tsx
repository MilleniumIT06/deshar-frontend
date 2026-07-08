import './styles.scss';

export const Loader=()=> {
  return (
    <div className="Loader__overlay">
      <div className="Loader__spinnerContainer">
        <div className="Loader__outerRing"/>
      </div>
    </div>
  );
}
