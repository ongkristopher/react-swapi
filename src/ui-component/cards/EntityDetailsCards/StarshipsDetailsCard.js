import ufo from 'assets/images/ufo.svg';
import { convertToTitleCase } from 'lib/convertToTitleCase';
import { getTranslation } from 'lib/getTranslation';
import PropTypes from 'prop-types';
import { DetailsPageCards } from 'ui-component';

const StarshipsDetailsCard = ({ entity, isWookiee }) => {
    return (
        entity.data[getTranslation('starships', isWookiee)] && (
            <DetailsPageCards
                categories={entity.data[getTranslation('starships', isWookiee)]}
                svgIcon={ufo}
                category="starships"
                descLabel1={convertToTitleCase(getTranslation('model', isWookiee))}
                descValueKey1={getTranslation('model', isWookiee)}
                descLabel2={convertToTitleCase(getTranslation('manufacturer', isWookiee))}
                descValueKey2={getTranslation('manufacturer', isWookiee)}
                isWookiee={isWookiee}
            />
        )
    );
};

StarshipsDetailsCard.propTypes = {
    entity: PropTypes.object,
    isWookiee: PropTypes.bool
};

export default StarshipsDetailsCard;
