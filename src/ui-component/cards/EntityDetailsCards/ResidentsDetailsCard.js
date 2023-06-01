import users from 'assets/images/users.svg';
import { convertToTitleCase } from 'lib/convertToTitleCase';
import { getTranslation } from 'lib/getTranslation';
import PropTypes from 'prop-types';
import { DetailsPageCards } from 'ui-component';

const ResidentsDetailsCard = ({ entity, isWookiee }) => {
    return (
        entity.data[getTranslation('residents', isWookiee)] && (
            <DetailsPageCards
                categories={entity.data[getTranslation('residents', isWookiee)]}
                svgIcon={users}
                category="people"
                descLabel1={convertToTitleCase(getTranslation('birth_year', isWookiee))}
                descValueKey1={getTranslation('birth_year', isWookiee)}
                isWookiee={isWookiee}
            />
        )
    );
};

ResidentsDetailsCard.propTypes = {
    entity: PropTypes.object,
    isWookiee: PropTypes.bool
};

export default ResidentsDetailsCard;
