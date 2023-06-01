import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { Grid } from '@mui/material';
// project imports
import planetIcon from 'assets/images/planet.svg';
import { formatStringInt } from 'lib/formatStringInt';
import { getIdFromUrl } from 'lib/getIdFromUrl';
import InfiniteScroll from 'react-infinite-scroll-component';
import { gridSpacing } from 'store/constant';
import { fetchPlanets } from 'store/planets/planetsSlice';
import { clearQuery, searchPlanets } from 'store/planets/searchPlanetsSlice';
import { CategoriesCard, EndOfResults, ErrorCard, MainCard, NoDataCard, SearchBar, SkeletonItemCard } from 'ui-component';
// ==============================|| PLANETS PAGE ||============================== //

function Planets() {
    const planets = useSelector((state) => state.planetsSlice);
    const search = useSelector((state) => state.searchPlanetsSlice);
    const [searchTerm, setSearchTerm] = useState(search.query);
    const dispatch = useDispatch();
    useEffect(() => {
        if (planets.data.results.length !== 0) return;
        dispatch(fetchPlanets());
    }, [dispatch, planets.data.results.length]);

    useEffect(() => {
        dispatch(clearQuery());
        if (searchTerm !== '') {
            dispatch(searchPlanets({ query: searchTerm, url: null }));
        }
    }, [dispatch, searchTerm]);

    const handleLoadNext = () => {
        if (search.query !== '') {
            dispatch(searchPlanets({ query: null, url: search.data.next }));
        } else {
            dispatch(fetchPlanets(planets.data.next));
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <MainCard title="Planets">
            <SearchBar onSearch={handleSearch} query={search.query} data={search} />
            {search.query !== '' ? generateList(search, handleLoadNext) : generateList(planets, handleLoadNext)}
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
                        {dataSlice.data.results.map((planet) => (
                            <CategoriesCard
                                key={getIdFromUrl(planet.url)}
                                iconSvg={planetIcon}
                                viewMore={`/planets/${getIdFromUrl(planet.url)}`}
                                title={planet.name}
                                entity="planets"
                                descLabel1="Terrain"
                                descValue1={planet.terrain}
                                descLabel2="Population"
                                descValue2={formatStringInt(planet.population)}
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

export default Planets;
