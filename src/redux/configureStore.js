if (process.env.REACT_APP_NODE_ENV === "production") {
    module.exports = require("./configureStore.prod");
} else if (process.env.REACT_APP_NODE_ENV === "development") {
    module.exports = require("./configureStore.dev");
}
