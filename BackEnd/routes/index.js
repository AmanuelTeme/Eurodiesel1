// * to collect the routes

const express = require("express");

// call router method from express
const router = express.Router();

// *  Import the Router files

//  Import Install router
const installRouter = require("./install.routes");
// Import the login routes
const loginRoutes = require("./login.routes");
//  Import service router
const serviceRoutes = require("./service.routes");
const customerRoutes = require("./customer.routes");
const vehicleRoutes = require("./vehicle.routes");
const employeeRoutes = require("./employee.routes");
const orderRoutes = require("./order.routes");
const maintenanceSpaceRoutes = require("./maintenanceSpace.routes");
const announcementRoutes = require("./announcement.routes");
const permissionRoutes = require("./permission.routes");
const notificationRoutes = require("./notification.routes");
const contactRoutes = require("./contact.routes");
const chatbotRoutes = require("./chatbot.routes");

// =========================

// * Use the route

// ` add the install router to the main router
router.use(installRouter);

// Add the service routes to the main router
router.use(serviceRoutes);
// Add the login routes to the main router
router.use(loginRoutes);
// add the customer routes to the main router
router.use(customerRoutes);
// add the vehicle routes to the main router
router.use(vehicleRoutes);
// Add the employee routes to the main router
router.use(employeeRoutes);
// Add the order routes to the main router
router.use("/api", orderRoutes);
// Add the maintenance space routes to the main router
router.use("/spaces", maintenanceSpaceRoutes);
// Add the announcement routes to the main router
router.use(announcementRoutes);
// Add the permission routes to the main router
router.use("/api/permissions", permissionRoutes);
// Add the notification routes to the main router
router.use("/api/notifications", notificationRoutes);
// Add the contact routes to the main router
router.use("/api", contactRoutes);
// Add the chatbot routes to the main router
router.use("/api/chatbot", chatbotRoutes);
module.exports = router;
