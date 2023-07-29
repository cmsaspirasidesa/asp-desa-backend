exports.paginate = (req, res, next) => {
  const { page } = req.query;
  let limit;
  let offset;
  // pagination
  if (page !== '' && typeof page !== 'undefined') {
    if (page.size !== '' && typeof page.size !== 'undefined') {
      limit = page.size;
      req.pageLimit = parseInt(limit);
    }

    if (page.number !== '' && typeof page.number !== 'undefined') {
      if (page.number <= 0) {
        page.number = 1;
      }
      offset = page.number * limit - limit;
      req.pageOffset = parseInt(offset);
    }
  } else {
    limit = 5; // limit 5 item
    offset = 0;
    req.pageLimit = limit;
    req.pageOffset = offset;
  }
  req.pageNumber = parseInt(page.number);
  next();
};
