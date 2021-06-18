// 如果沒有透過 exports 或 module.exports 去暴露資訊的，
// 其他的就都是 private

const name = "ABC";
const food = {
  brand: "Ford",
  color: "blue",
};

exports.name = "Steven";

exports.getColor = function () {
  return food.color;
};

exports.setColor = function (color) {
  if (color == "Yellow" || color == "Red") {
    food.color = color;
  }
  // TODO: 不符合的，不給改
};


// module.exports = {};