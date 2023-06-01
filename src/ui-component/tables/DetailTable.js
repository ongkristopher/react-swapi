import { convertToTitleCase } from 'lib/convertToTitleCase';
import { formatStringInt } from 'lib/formatStringInt';
import { getTranslation } from 'lib/getTranslation';
import PropTypes from 'prop-types';

const DetailTable = ({ details, isWookiee }) => {
    const arrayDetails = [];
    const unnecesarryItems = [
        getTranslation('name', isWookiee),
        getTranslation('url', isWookiee),
        getTranslation('created', isWookiee),
        getTranslation('edited', isWookiee),
        getTranslation('homeworld', isWookiee)
    ];

    for (const [key, value] of Object.entries(details)) {
        if (value.constructor !== Array && !unnecesarryItems.includes(key)) {
            arrayDetails.push({ key: convertToTitleCase(key), value: formatStringInt(value) });
        }
    }

    return (
        <table
            style={{
                marginLeft: 'auto',
                marginRight: 'auto'
            }}
        >
            <tbody>
                {arrayDetails.map((data) => (
                    <tr key={data.value}>
                        <td style={{ fontWeight: 'bold' }}>{data.key}</td>
                        <td style={{ textAlign: 'right' }}>{data.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

DetailTable.propTypes = {
    details: PropTypes.object,
    isWookiee: PropTypes.bool
};

export default DetailTable;
