module.exports = {
  Paginate: (url, options, userPaginate) => {
    const objectPaginate = {
      first: `${url}?limit=${options.limit}&page=${1}`,
      prev: `${url}?limit=${options.limit}&page=${options.page - 1}`,
      next: `${url}?limit=${options.limit}&page=${options.page + 1}`,
      last: `${url}?limit=${options.limit}&page=${userPaginate.totalPages}`,
    };
    return objectPaginate;
  },
};
