const cookieOption = {
  path: "/",
  httpOnly: true,
  sameSite: "lax",
  maxAge: 14 * 24 * 60 * 60 * 1000,
};

module.exports = cookieOption;
