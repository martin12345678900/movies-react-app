import classes from './MoviesForum.module.css';

function MoviesForum() {
    return (
        <article className={classes.home}>
            <h2 className={classes.details}>
                <span className={classes.title}>Movies Forum</span>
                <span className={classes.description}>Search for newest movies, post new movies, share opinions and likes anywhere, anytime!</span>
            </h2>
        </article>
    );
}

export default MoviesForum;