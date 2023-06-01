import car from 'assets/images/car.svg';
import { convertToTitleCase } from 'lib/convertToTitleCase';
import { getTranslation } from 'lib/getTranslation';
import PropTypes from 'prop-types';
import { DetailsPageCards } from 'ui-component';

const VehiclesDetailsCard = ({ entity, isWookiee }) => {
    return (
        entity.data[getTranslation('vehicles', isWookiee)] && (
            <DetailsPageCards
                categories={entity.data[getTranslation('vehicles', isWookiee)]}
                svgIcon={car}
                category="vehicles"
                descLabel1={convertToTitleCase(getTranslation('model', isWookiee))}
                descValueKey1={getTranslation('model', isWookiee)}
                descLabel2={convertToTitleCase(getTranslation('manufacturer', isWookiee))}
                descValueKey2={getTranslation('manufacturer', isWookiee)}
                isWookiee={isWookiee}
            />
        )
    );
};

VehiclesDetailsCard.propTypes = {
    entity: PropTypes.object,
    isWookiee: PropTypes.bool
};

export default VehiclesDetailsCard;
