import { createMuiTheme } from '@material-ui/core/styles';

// Paving the road to ligth and dark themes.
// And trying to follow the DRY principle while at it :D
const Theme = createMuiTheme({
    palette: {
        theme: "dark",
        primary: {
            main: "#3b3b3b",
        },
    }
})

export default Theme