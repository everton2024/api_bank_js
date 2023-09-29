const successResponse200 = (res, returnData) => {
  return res.status(200).send(returnData);
};

module.exports = { successResponse200 };
