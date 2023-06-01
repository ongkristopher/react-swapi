import { OutlinedInput, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { styled, useTheme } from '@mui/material/styles';
import { IconSearch } from '@tabler/icons';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import config from '../../config';

const OutlineInputStyle = styled(OutlinedInput)(({ theme }) => ({
    width: '25%',
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: '50%'
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));

const SearchBar = ({ onSearch, query, data }) => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState(query);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearch(searchTerm);
        }, config.debounceTime);

        return () => {
            clearTimeout(delayDebounceFn);
        };
    }, [searchTerm, onSearch]);

    const handleChange = (event) => {
        const cleanedInput = event.target.value;
        setSearchTerm(cleanedInput);
    };

    return (
        <>
            <OutlineInputStyle
                id="input-search-header"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search by name"
                startAdornment={
                    <InputAdornment position="start">
                        <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                    </InputAdornment>
                }
                aria-describedby="search-helper-text"
                inputProps={{ 'aria-label': 'weight' }}
            />
            {data.data.count > 0 && (
                <Typography
                    sx={{
                        mt: -1.5,
                        mb: 2,
                        ml: 2,
                        fontStyle: 'italic'
                    }}
                >
                    {data.data.count} Items found
                </Typography>
            )}
        </>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func,
    query: PropTypes.string,
    data: PropTypes.object
};

export default SearchBar;
