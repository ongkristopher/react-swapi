import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { Grid } from '@mui/material';
// project imports
import cell from 'assets/images/cell.svg';
import { getIdFromUrl } from 'lib/getIdFromUrl';
import InfiniteScroll from 'react-infinite-scroll-component';
import { gridSpacing } from 'store/constant';
import { clearQuery, searchSpecies } from 'store/species/searchSpeciesSlice';
import { fetchSpecies } from 'store/species/speciesSlice';
import { CategoriesCard, EndOfResults, ErrorCard, MainCard, NoDataCard, SearchBar, SkeletonItemCard } from 'ui-component';
// ==============================|| SPECIES PAGE ||============================== //

function Species() {
    const species = useSelector((state) => state.speciesSlice);
    const search = useSelector((state) => state.searchSpeciesSlice);
    const [searchTerm, setSearchTerm] = useState(search.query);
    const dispatch = useDispatch();
    useEffect(() => {
        if (species.data.results.length !== 0) return;
        dispatch(fetchSpecies());
    }, [dispatch, species.data.results.length]);

    useEffect(() => {
        dispatch(clearQuery());
        if (searchTerm !== '') {
            dispatch(searchSpecies({ query: searchTerm, url: null }));
        }
    }, [dispatch, searchTerm]);

    const handleLoadNext = () => {
        if (search.query !== '') {
            dispatch(searchSpecies({ query: null, url: search.data.next }));
        } else {
            dispatch(fetchSpecies(species.data.next));
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <MainCard title="Species">
            <SearchBar onSearch={handleSearch} query={search.query} data={search} />
            {search.query !== '' ? generateList(search, handleLoadNext) : generateList(species, handleLoadNext)}
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
                        {dataSlice.data.results.map((eachSpecies) => (
                            <CategoriesCard
                                key={getIdFromUrl(eachSpecies.url)}
                                iconSvg={cell}
                                viewMore={`/species/${getIdFromUrl(eachSpecies.url)}`}
                                title={eachSpecies.name}
                                entity="species"
                                descLabel1="Classification"
                                descValue1={eachSpecies.classification}
                                descLabel2="Language"
                                descValue2={eachSpecies.language}
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

export default Species;
