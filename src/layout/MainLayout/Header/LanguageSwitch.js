import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WOOKIEE_TOGGLE } from 'store/actions';

const LanguageSwitch = () => {
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);

    const [checked, setChecked] = useState(customization.useWookiee);

    const handleChange = () => {
        setChecked(!checked);
    };

    useEffect(() => {
        dispatch({ type: WOOKIEE_TOGGLE, wookieeToggle: checked });
    }, [dispatch, checked]);

    const switchComponent = <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />;

    return (
        <FormGroup>
            <FormControlLabel control={switchComponent} label="Wookiee" />
        </FormGroup>
    );
};
export default LanguageSwitch;
