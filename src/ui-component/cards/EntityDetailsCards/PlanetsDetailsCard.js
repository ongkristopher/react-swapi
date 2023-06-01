import planetIcon from 'assets/images/planet.svg';
import { convertToTitleCase } from 'lib/convertToTitleCase';
import { formatStringInt } from 'lib/formatStringInt';
import { getTranslation } from 'lib/getTranslation';
import PropTypes from 'prop-types';
import { DetailsPageCards } from 'ui-component';

const PlanetsDetailsCard = ({ entity, isWookiee }) => {
    return (
        entity.data[getTranslation('planets', isWookiee)] && (
            <DetailsPageCards
                categories={entity.data[getTranslation('planets', isWookiee)]}
                svgIcon={planetIcon}
                category="planets"
                descLabel1={convertToTitleCase(getTranslation('terrain', isWookiee))}
                descValueKey1={getTranslation('terrain', isWookiee)}
                descLabel2={convertToTitleCase(getTranslation('population', isWookiee))}
                descValueKey2={getTranslation('population', isWookiee)}
                formatHelper={formatStringInt}
                isWookiee={isWookiee}
            />
        )
    );
};

PlanetsDetailsCard.propTypes = {
    entity: PropTypes.object,
    isWookiee: PropTypes.bool
};

export default PlanetsDetailsCard;
