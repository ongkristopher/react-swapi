import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { Grid } from '@mui/material';
// project imports
import users from 'assets/images/users.svg';
import { getIdFromUrl } from 'lib/getIdFromUrl';
import InfiniteScroll from 'react-infinite-scroll-component';
import { gridSpacing } from 'store/constant';
import { fetchPeople } from 'store/people/peopleSlice';
import { clearQuery, searchPeople } from 'store/people/searchPeopleSlice';
import { CategoriesCard, EndOfResults, ErrorCard, MainCard, NoDataCard, SearchBar, SkeletonItemCard } from 'ui-component';
// ==============================|| PEOPLES PAGE ||============================== //

function People() {
    const people = useSelector((state) => state.peopleSlice);
    const search = useSelector((state) => state.searchPeopleSlice);
    const [searchTerm, setSearchTerm] = useState(search.query);
    const dispatch = useDispatch();
    useEffect(() => {
        if (people.data.results.length !== 0) return;
        dispatch(fetchPeople());
    }, [dispatch, people.data.results.length]);

    useEffect(() => {
        dispatch(clearQuery());
        if (searchTerm !== '') {
            dispatch(searchPeople({ query: searchTerm, url: null }));
        }
    }, [dispatch, searchTerm]);

    const handleLoadNext = () => {
        if (search.query !== '') {
            dispatch(searchPeople({ query: null, url: search.data.next }));
        } else {
            dispatch(fetchPeople(people.data.next));
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <MainCard title="People">
            <SearchBar onSearch={handleSearch} query={search.query} data={search} />
            {search.query !== '' ? generateList(search, handleLoadNext) : generateList(people, handleLoadNext)}
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
                        {dataSlice.data.results.map((people) => (
                            <CategoriesCard
                                key={getIdFromUrl(people.url)}
                                iconSvg={users}
                                viewMore={`/people/${getIdFromUrl(people.url)}`}
                                title={people.name}
                                entity="people"
                                descLabel1="Birth Year"
                                descValue1={people.birth_year}
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

export default People;
