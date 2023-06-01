/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
    return {
        mode: theme?.customization?.navType,
        common: {
            black: theme.colors?.darkPaper
        },
        primary: {
            light: theme.colors?.primaryLight,
            main: theme.colors?.primaryMain,
            dark: theme.colors?.primaryDark,
            200: theme.colors?.primary200,
            800: theme.colors?.primary800
        },
        secondary: {
            light: theme.colors?.secondaryLight,
            main: theme.colors?.secondaryMain,
            dark: theme.colors?.secondaryDark,
            200: theme.colors?.secondary200,
            800: theme.colors?.secondary800
        },
        error: {
            light: theme.colors?.errorLight,
            main: theme.colors?.errorMain,
            dark: theme.colors?.errorDark
        },
        orange: {
            light: theme.colors?.orangeLight,
            main: theme.colors?.orangeMain,
            dark: theme.colors?.orangeDark
        },
        warning: {
            light: theme.colors?.warningLight,
            main: theme.colors?.warningMain,
            dark: theme.colors?.warningDark
        },
        success: {
            light: theme.colors?.successLight,
            200: theme.colors?.success200,
            main: theme.colors?.successMain,
            dark: theme.colors?.successDark
        },
        grey: {
            50: theme.colors?.grey50,
            100: theme.colors?.grey100,
            500: theme.darkTextSecondary,
            600: theme.heading,
            700: theme.darkTextPrimary,
            900: theme.textDark
        },
        dark: {
            light: theme.colors?.darkTextPrimary,
            main: theme.colors?.darkLevel1,
            dark: theme.colors?.darkLevel2,
            800: theme.colors?.darkBackground,
            900: theme.colors?.darkPaper
        },
        text: {
            primary: theme.darkTextPrimary,
            secondary: theme.darkTextSecondary,
            dark: theme.textDark,
            hint: theme.colors?.grey100
        },
        background: {
            paper: theme.paper,
            default: theme.backgroundDefault
        },
        entities: {
            films: {
                main: theme.colors.filmsMain,
                bg: theme.colors.filmsBg,
                text: theme.colors.filmsText,
                subtext: theme.colors.filmsSubtext
            },
            people: {
                main: theme.colors.peopleMain,
                bg: theme.colors.peopleBg,
                text: theme.colors.peopleText,
                subtext: theme.colors.peopleSubtext
            },
            planets: {
                main: theme.colors.planetsMain,
                bg: theme.colors.planetsBg,
                text: theme.colors.planetsText,
                subtext: theme.colors.planetsSubtext
            },
            species: {
                main: theme.colors.speciesMain,
                bg: theme.colors.speciesBg,
                text: theme.colors.speciesText,
                subtext: theme.colors.speciesSubtext
            },
            starships: {
                main: theme.colors.starshipsMain,
                bg: theme.colors.starshipsBg,
                text: theme.colors.starshipsText,
                subtext: theme.colors.starshipsSubtext
            },
            vehicles: {
                main: theme.colors.vehiclesMain,
                bg: theme.colors.vehiclesBg,
                text: theme.colors.vehiclesText,
                subtext: theme.colors.vehiclesSubtext
            }
        }
    };
}
