import movie from 'assets/images/movie.svg';
import { convertToTitleCase } from 'lib/convertToTitleCase';
import { dateFormatToString } from 'lib/dateFormatToString';
import { getTranslation } from 'lib/getTranslation';
import PropTypes from 'prop-types';
import { DetailsPageCards } from 'ui-component';

const FilmsDetailsCard = ({ entity, isWookiee }) => {
    return (
        entity.data[getTranslation('films', isWookiee)] && (
            <DetailsPageCards
                categories={entity.data[getTranslation('films', isWookiee)]}
                svgIcon={movie}
                category="films"
                descLabel1={convertToTitleCase(getTranslation('director', isWookiee))}
                descValueKey1={getTranslation('director', isWookiee)}
                descLabel2={convertToTitleCase(getTranslation('release_date', isWookiee))}
                descValueKey2={getTranslation('release_date', isWookiee)}
                formatHelper={dateFormatToString}
                isWookiee={isWookiee}
            />
        )
    );
};

FilmsDetailsCard.propTypes = {
    entity: PropTypes.object,
    isWookiee: PropTypes.bool
};

export default FilmsDetailsCard;
