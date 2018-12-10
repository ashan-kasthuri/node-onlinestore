exports.get404 = (req, res, next) => {
  let path = '';
  let method = '';
  if (
    !process.NODE_ENV ||
    (process.env.NODE_ENV && process.env.NODE_ENV !== 'production')
  ) {
    path = req.path;
    method = req.method;
  }

  res.status(404).render('404', { path, method });
};
