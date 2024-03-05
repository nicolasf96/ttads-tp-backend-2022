import config from '../config/index.js';

const { pagination } = config;

const paginationParseParams = ({ limit, page }) => ({
    limit: parseInt(limit || pagination.limit, 10), // Utiliza el valor de pagination.limit si limit no está definido
    page: parseInt(page || pagination.page, 10) // Utiliza el valor de pagination.page si page no está definido
});

export default paginationParseParams;
