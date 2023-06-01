import { Grid } from '@mui/material';
import { getIdFromUrl } from 'lib/getIdFromUrl';
import { getTranslation } from 'lib/getTranslation';
import { mutateObject } from 'lib/mutateObject';
import PropTypes from 'prop-types';
import { useState } from 'react';
import DetailErrorCard from './DetailErrorCard/DetailErrorCard';
import SkeletonItemCard from './Skeleton/ItemCard';
import config from '../../config';
import CategoriesCard from './CategoriesCard';

import NoDataCard from './NoDataCard';

const DetailsPageCards = ({
    categories,
    category,
    svgIcon,
    descLabel1,
    descValueKey1,
    descLabel2,
    descValueKey2,
    formatHelper,
    isWookiee
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [categoryData, setCategoryData] = useState([]);

    const translateUrl = categories.map((_category) => {
        const id = getIdFromUrl(_category);
        let url = config.url + category + '/' + id;
        if (isWookiee) {
            url = config.url + category + '/' + id + '/?format=wookiee';
        }
        return url;
    });

    let requestArray = translateUrl.map(async (req) => {
        if (req) {
            const res = await fetch(req);
            if (res.status === 200) {
                let text = await res.text();
                return mutateObject(text, isWookiee);
            } else if (res.status === 500) {
                return {
                    error: true,
                    request_url: res.url,
                    message: 'Server Error'
                };
            }
        }
    });

    Promise.all(requestArray).then((res) => {
        if (isLoading) setCategoryData(res);
        setIsLoading(false);
    });

    if (isLoading) return <SkeletonItemCard />;

    return (
        <>
            {!isLoading && categoryData.length <= 0 && <NoDataCard />}
            {descLabel2 && descValueKey2 ? (
                <Grid container spacing={4}>
                    {!isLoading &&
                        categoryData &&
                        categoryData.map((data) =>
                            data.error ? (
                                <Grid key={data.request_url} item xs={12} sm={6} md={4}>
                                    <DetailErrorCard iconSvg={svgIcon} error={data} />
                                </Grid>
                            ) : (
                                <Grid key={getIdFromUrl(data[getTranslation('url', isWookiee)])} item xs={12} sm={6} md={4}>
                                    <CategoriesCard
                                        iconSvg={svgIcon}
                                        viewMore={`/${category}/${getIdFromUrl(data[getTranslation('url', isWookiee)])}`}
                                        title={data[getTranslation('title', isWookiee)] ?? data[getTranslation('name', isWookiee)]}
                                        entity={category}
                                        descLabel1={descLabel1}
                                        descValue1={data[descValueKey1]}
                                        descLabel2={descLabel2}
                                        descValue2={formatHelper ? formatHelper(data[descValueKey2]) : data[descValueKey2]}
                                    />
                                </Grid>
                            )
                        )}
                </Grid>
            ) : (
                <Grid container spacing={4}>
                    {!isLoading &&
                        categoryData &&
                        categoryData.map((data) =>
                            data.error ? (
                                <Grid key={data.request_url} item xs={12} sm={6} md={4}>
                                    <DetailErrorCard iconSvg={svgIcon} error={data} />
                                </Grid>
                            ) : (
                                <Grid key={getIdFromUrl(data[getTranslation('url', isWookiee)])} item xs={12} sm={6} md={4}>
                                    <CategoriesCard
                                        iconSvg={svgIcon}
                                        viewMore={`/${category}/${getIdFromUrl(data[getTranslation('url', isWookiee)])}`}
                                        title={data[getTranslation('name', isWookiee)]}
                                        entity={category}
                                        descLabel1={descLabel1}
                                        descValue1={data[descValueKey1]}
                                    />
                                </Grid>
                            )
                        )}
                </Grid>
            )}
        </>
    );
};

DetailsPageCards.propTypes = {
    categories: PropTypes.array,
    svgIcon: PropTypes.string,
    category: PropTypes.string,
    descLabel1: PropTypes.string,
    descValueKey1: PropTypes.string,
    descLabel2: PropTypes.string,
    descValueKey2: PropTypes.string,
    formatHelper: PropTypes.func,
    isWookiee: PropTypes.bool
};
export default DetailsPageCards;
