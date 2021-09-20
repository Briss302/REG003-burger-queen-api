module.exports = {
  Paginate: (url, options, userPaginate) => {
    const objectPaginate = {
      first: `${url}?limit=${options.limit}&page=${1}`,
      prev: `${url}?limit=${options.limit}&page=${options.page - 1}`,
      next: `${url}?limit=${options.limit}&page=${options.page + 1}`,
      last: `${url}?limit=${options.limit}&page=${userPaginate.length}`,
    };
    return objectPaginate;
  },
  isAValidEmail: (email) => {
    if (email === 'admin@localhost') {
      return true;
    }
    const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/i;
    return emailRegex.test(email);
  },
  isAValidNumb: (numb) => {
    const numbRegex = /^[0-9]+$/;
    return numbRegex.test(numb);
  },

};
