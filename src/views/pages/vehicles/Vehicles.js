import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { Grid } from '@mui/material';
// project imports
import car from 'assets/images/car.svg';
import { getIdFromUrl } from 'lib/getIdFromUrl';
import InfiniteScroll from 'react-infinite-scroll-component';
import { gridSpacing } from 'store/constant';
import { clearQuery, searchVehicles } from 'store/vehicles/searchVehiclesSlice';
import { fetchVehicles } from 'store/vehicles/vehiclesSlice';
import { CategoriesCard, EndOfResults, ErrorCard, MainCard, NoDataCard, SearchBar, SkeletonItemCard } from 'ui-component';
// ==============================|| VEHICLES PAGE ||============================== //

function Vehicles() {
    const vehicles = useSelector((state) => state.vehiclesSlice);
    const search = useSelector((state) => state.searchVehiclesSlice);
    const [searchTerm, setSearchTerm] = useState(search.query);
    const dispatch = useDispatch();
    useEffect(() => {
        if (vehicles.data.results.length !== 0) return;
        dispatch(fetchVehicles());
    }, [dispatch, vehicles.data.results.length]);

    useEffect(() => {
        dispatch(clearQuery());
        if (searchTerm !== '') {
            dispatch(searchVehicles({ query: searchTerm, url: null }));
        }
    }, [dispatch, searchTerm]);

    const handleLoadNext = () => {
        if (search.query !== '') {
            dispatch(searchVehicles({ query: null, url: search.data.next }));
        } else {
            dispatch(fetchVehicles(vehicles.data.next));
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <MainCard title="Vehicles">
            <SearchBar onSearch={handleSearch} query={search.query} data={search} />
            {search.query !== '' ? generateList(search, handleLoadNext) : generateList(vehicles, handleLoadNext)}
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
                        {dataSlice.data.results.map((vehicle) => (
                            <CategoriesCard
                                key={getIdFromUrl(vehicle.url)}
                                iconSvg={car}
                                viewMore={`/vehicles/${getIdFromUrl(vehicle.url)}`}
                                title={vehicle.name}
                                entity="vehicles"
                                descLabel1="Model"
                                descValue1={vehicle.model}
                                descLabel2="Manufacturer"
                                descValue2={vehicle.manufacturer}
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

export default Vehicles;
