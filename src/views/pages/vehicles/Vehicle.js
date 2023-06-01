import { useEffect } from 'react';
// material-ui
import { useParams } from 'react-router-dom';
// project imports
import { Box, Container, Stack, Typography } from '@mui/material';
import { getTranslation } from 'lib/getTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicle } from 'store/vehicles/vehicleSlice';
import { BackToListButton, DetailTable, FilmsDetailsCard, PilotsDetailsCard, SkeletonItemCard } from 'ui-component';
// ==============================|| VEHICLE DETAIL PAGE ||============================== //

const Vehicle = () => {
    const vehicle = useSelector((state) => state.vehicleSlice);
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();
    const vehicleParam = useParams();
    const parentPage = '/vehicles';

    useEffect(() => {
        dispatch(fetchVehicle({ id: vehicleParam.id, isWookiee: customization.useWookiee }));
    }, [customization.useWookiee, dispatch, vehicleParam.id]);

    return (
        <>
            {vehicle.loading ? (
                <SkeletonItemCard />
            ) : (
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 1,
                        pb: 6
                    }}
                >
                    <Stack sx={{ pt: 1, pl: 1 }} direction="row">
                        <BackToListButton parentPage={parentPage} />
                    </Stack>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h1" align="center" color="text.primary" gutterBottom>
                            {vehicle.data[getTranslation('name', customization.useWookiee)]}
                        </Typography>
                        <DetailTable details={vehicle.data} isWookiee={customization.useWookiee} />
                    </Container>

                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('pilots', customization.useWookiee)}
                        </Typography>
                        <PilotsDetailsCard entity={vehicle} isWookiee={customization.useWookiee} />
                    </Container>

                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('films', customization.useWookiee)}
                        </Typography>
                        <FilmsDetailsCard entity={vehicle} isWookiee={customization.useWookiee} />
                    </Container>
                </Box>
            )}
        </>
    );
};

export default Vehicle;
