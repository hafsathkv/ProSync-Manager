module.exports.adminFunctions = {
  login: {
    post: require("./post/login"),
  },
  task: {
    get: require("./get/task"),
    post: require("./post/task"),
    delete: require("./delete/task"),
  },
  location: {
    get: require("./get/location"),
    post: require("./post/location"),
    delete: require("./delete/location"),
    put: require("./put/location"),
  },
  designation: {
    get: require("./get/designation"),
    post: require("./post/designation"),
    delete: require("./delete/designation"),
    put: require("./put/designation"),
  },
  category: {
    get: require("./get/category"),
    post: require("./post/category"),
    delete: require("./delete/category"),
    put: require("./put/category"),
  },
  branches: {
    get: require("./get/branches"),
    post: require("./post/branches"),
    delete: require("./delete/branches"),
    put: require("./put/branches"),
  },
  Notification: {
    get: require("./get/notification"),
    post: require("./post/notification"),
    delete: require("./delete/notification"),
    put: require("./put/notification"),
  },
};
