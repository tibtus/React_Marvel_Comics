import { useState, useRef, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar = (props) => {
    
 
    const [char, setCharList] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();



    useEffect(() => {
        updateChar();
        setInterval(updateChar, 5000);
        
        
    }, [])



    const onCharLoaded = (char) => {  
        setCharList(char);
        setLoading(loading => false);
    }

    const onCharListLoading = () => {
        setLoading(loading => true);
    }

    const onError = () => {        
        setLoading(loading => false);
        setError(error => true)
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        onCharListLoading();
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);

    }

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} /> : null;


        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )

    
    
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki} = char; 

    const thumbnailFalse = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";  
    const imgClassName = thumbnail === thumbnailFalse ? 'randomchar__imgContain' : 'randomchar__img';       
 
    
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={imgClassName}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>

    )

}

export default RandomChar;