import users from 'assets/images/users.svg';
import { convertToTitleCase } from 'lib/convertToTitleCase';
import { getTranslation } from 'lib/getTranslation';
import PropTypes from 'prop-types';
import { DetailsPageCards } from 'ui-component';

const PilotsDetailsCard = ({ entity, isWookiee }) => {
    return (
        entity.data[getTranslation('pilots', isWookiee)] && (
            <DetailsPageCards
                categories={entity.data[getTranslation('pilots', isWookiee)]}
                svgIcon={users}
                category="people"
                descLabel1={convertToTitleCase(getTranslation('birth_year', isWookiee))}
                descValueKey1={getTranslation('birth_year', isWookiee)}
                isWookiee={isWookiee}
            />
        )
    );
};

PilotsDetailsCard.propTypes = {
    entity: PropTypes.object,
    isWookiee: PropTypes.bool
};

export default PilotsDetailsCard;
