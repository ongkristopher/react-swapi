import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilms } from 'store/films/filmsSlice';
// material-ui
import { Grid } from '@mui/material';
// project imports
import movie from 'assets/images/movie.svg';
import { dateFormatToString } from 'lib/dateFormatToString';
import { getIdFromUrl } from 'lib/getIdFromUrl';
import InfiniteScroll from 'react-infinite-scroll-component';
import { gridSpacing } from 'store/constant';
import { clearQuery, searchFilms } from 'store/films/searchFilmsSlice';
import { CategoriesCard, EndOfResults, ErrorCard, MainCard, NoDataCard, SearchBar, SkeletonItemCard } from 'ui-component';
// ==============================|| FILMS PAGE ||============================== //

function Films() {
    const films = useSelector((state) => state.filmsSlice);
    const search = useSelector((state) => state.searchFilmSlice);
    const [searchTerm, setSearchTerm] = useState(search.query);
    const dispatch = useDispatch();
    useEffect(() => {
        if (films.data.results.length !== 0) return;
        dispatch(fetchFilms());
    }, [dispatch, films.data.results.length]);

    useEffect(() => {
        dispatch(clearQuery());

        if (searchTerm !== '') {
            dispatch(searchFilms({ query: searchTerm, url: null }));
        }
    }, [dispatch, searchTerm]);

    const handleLoadNext = () => {
        if (search.query !== '') {
            dispatch(searchFilms({ query: null, url: search.data.next }));
        } else {
            dispatch(fetchFilms(films.data.next));
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <MainCard title="Films">
            <SearchBar onSearch={handleSearch} query={search.query} data={search} />
            {search.query !== '' ? generateList(search, handleLoadNext) : generateList(films, handleLoadNext)}
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
                        {dataSlice.data.results.map((film) => (
                            <CategoriesCard
                                key={getIdFromUrl(film.url)}
                                iconSvg={movie}
                                viewMore={`/films/${getIdFromUrl(film.url)}`}
                                title={film.title}
                                entity="films"
                                descLabel1="Directed By"
                                descValue1={film.director}
                                descLabel2="Release Date"
                                descValue2={dateFormatToString(film.release_date)}
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

export default Films;
