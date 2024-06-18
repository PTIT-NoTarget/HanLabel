let Constants;
if (process.env.ENV === "cicd") {
  Constants = require("./ConstantCicd.tsx");
} else {
  Constants = require("./Constant.tsx");
}
export default Constants;
