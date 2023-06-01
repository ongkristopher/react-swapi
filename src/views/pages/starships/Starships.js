import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { Grid } from '@mui/material';
// project imports
import ufo from 'assets/images/ufo.svg';
import { getIdFromUrl } from 'lib/getIdFromUrl';
import InfiniteScroll from 'react-infinite-scroll-component';
import { gridSpacing } from 'store/constant';
import { clearQuery, searchStarships } from 'store/starships/searchStarshipsSlice';
import { fetchStarships } from 'store/starships/starshipsSlice';
import { CategoriesCard, EndOfResults, ErrorCard, MainCard, NoDataCard, SearchBar, SkeletonItemCard } from 'ui-component';
// ==============================|| STARSHIPS PAGE ||============================== //

function Starships() {
    const starships = useSelector((state) => state.starshipsSlice);
    const search = useSelector((state) => state.searchStarshipsSlice);
    const [searchTerm, setSearchTerm] = useState(search.query);
    const dispatch = useDispatch();
    useEffect(() => {
        if (starships.data.results.length !== 0) return;
        dispatch(fetchStarships());
    }, [dispatch, starships.data.results.length]);

    useEffect(() => {
        dispatch(clearQuery());
        if (searchTerm !== '') {
            dispatch(searchStarships({ query: searchTerm, url: null }));
        }
    }, [dispatch, searchTerm]);

    const handleLoadNext = () => {
        if (search.query !== '') {
            dispatch(searchStarships({ query: null, url: search.data.next }));
        } else {
            dispatch(fetchStarships(starships.data.next));
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <MainCard title="Starships">
            <SearchBar onSearch={handleSearch} query={search.query} data={search} />
            {search.query !== '' ? generateList(search, handleLoadNext) : generateList(starships, handleLoadNext)}
        </MainCard>
    );
}

const generateList = (dataSlice, handleLoadNext) => {
    return (
        <>
            {dataSlice.loading && <SkeletonItemCard />}
            {!dataSlice.loading && dataSlice.error && <ErrorCard value={dataSlice.error} />}
            {dataSlice.data.results.length ? (
                <InfiniteScroll
                    dataLength={dataSlice.data.results.length}
                    next={handleLoadNext}
                    hasMore={dataSlice.data.next !== null}
                    loader={<SkeletonItemCard />}
                    endMessage={<EndOfResults />}
                >
                    <Grid container spacing={gridSpacing}>
                        {dataSlice.data.results.map((starship) => (
                            <CategoriesCard
                                key={getIdFromUrl(starship.url)}
                                iconSvg={ufo}
                                viewMore={`/starships/${getIdFromUrl(starship.url)}`}
                                title={starship.name}
                                entity="starships"
                                descLabel1="Model"
                                descValue1={starship.model}
                                descLabel2="Manufacturer"
                                descValue2={starship.manufacturer}
                            />
                        ))}
                    </Grid>
                </InfiniteScroll>
            ) : (
                !dataSlice.loading && dataSlice.error === '' && <NoDataCard dataSlice={dataSlice} />
            )}
        </>
    );
};

export default Starships;
