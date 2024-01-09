const mongoose = require("mongoose");
const Schema = require("./schema");

module.exports = {
  EMPLOYEES_MODEL: mongoose.model("employees", Schema.EmployeeSchema),
  ADMIN_MODEL: mongoose.model("admin", Schema.AdminSchema),
  TASK_MODEL: mongoose.model("task", Schema.TaskSchema),
  LOCATION_MODEL: mongoose.model("locations", Schema.LocationSchema),
  DESIGNATION_MODEL: mongoose.model("designations", Schema.designation),
  CATEGORY_MODEL: mongoose.model("category", Schema.CategorySchema),
  BRANCHES_MODEL: mongoose.model("branches", Schema.Branches),
  NOTIFICATION_MODEL: mongoose.model("notification", Schema.Notification),
  COMPANIES_MODEL: mongoose.model("companies", Schema.CompaniesSchema),
  CUSTOMERS_MODEL: mongoose.model("customers", Schema.CustomerSchema),
  REMINDERS_MODEL: mongoose.model("reminders", Schema.Reminder),
  COMPANY_BILLING_MODEL: mongoose.model('company_billing', Schema.CompanyBilling),
  CUSTOMER_BILLING_MODEL: mongoose.model('customer_billing', Schema.CustomerBilling),
  COUNTER_BILLING_MODEL: mongoose.model('counter_billing', Schema.CounterBilling)
};
