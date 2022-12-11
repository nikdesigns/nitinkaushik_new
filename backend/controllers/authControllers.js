export const getUsers = (req, res) => {
  res.json({
    data: 'Nitin, Anmol, Anika',
  });
};

export const register = (req, res) => {
  console.log(req.body);
};
