import style from './Loader.module.css';


const Loader = () => {
    return (
        <div className={style.loader}>
            <div className={[style.dot, style.dot1].join(' ')}></div>
            <div className={[style.dot, style.dot2].join(' ')}></div>
            <div className={[style.dot, style.dot3].join(' ')}></div>
            <div className={[style.dot, style.dot4].join(' ')}></div> 
        </div>
    )
}

export default Loader;