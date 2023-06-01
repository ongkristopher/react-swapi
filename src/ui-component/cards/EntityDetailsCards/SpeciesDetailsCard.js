import cell from 'assets/images/cell.svg';
import { convertToTitleCase } from 'lib/convertToTitleCase';
import { getTranslation } from 'lib/getTranslation';
import PropTypes from 'prop-types';
import { DetailsPageCards } from 'ui-component';

const SpeciesDetailsCard = ({ entity, isWookiee }) => {
    return (
        entity.data[getTranslation('species', isWookiee)] && (
            <DetailsPageCards
                categories={entity.data[getTranslation('species', isWookiee)]}
                svgIcon={cell}
                category="species"
                descLabel1={convertToTitleCase(getTranslation('classification', isWookiee))}
                descValueKey1={getTranslation('classification', isWookiee)}
                descLabel2={convertToTitleCase(getTranslation('language', isWookiee))}
                descValueKey2={getTranslation('language', isWookiee)}
                isWookiee={isWookiee}
            />
        )
    );
};

SpeciesDetailsCard.propTypes = {
    entity: PropTypes.object,
    isWookiee: PropTypes.bool
};

export default SpeciesDetailsCard;
