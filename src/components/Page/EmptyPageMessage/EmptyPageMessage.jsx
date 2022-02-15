import {Link} from "react-router-dom";

function EmptyPageMessage(stringToShow, suggestedAction, linkTo) {
    return(
        <div className="no-history">
            <div className="search-icon"></div>
            {stringToShow}
            <Link to={linkTo}><button>{suggestedAction}</button></Link>
        </div>
    )
}

export default EmptyPageMessage;