-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 01, 2025 at 11:46 AM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abegarage`
--
CREATE DATABASE IF NOT EXISTS `abegarage` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `abegarage`;

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `announcement_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`announcement_id`, `title`, `message`, `created_at`, `is_active`) VALUES
(1, 'hi', 'hi', '2025-06-29 21:07:54', 1),
(2, 'hi', 'see', '2025-07-01 13:42:04', 1);

-- --------------------------------------------------------

--
-- Table structure for table `announcement_reads`
--

CREATE TABLE `announcement_reads` (
  `announcement_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `read_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `announcement_reads`
--

INSERT INTO `announcement_reads` (`announcement_id`, `employee_id`, `read_at`) VALUES
(1, 2, '2025-06-29 21:09:46'),
(2, 2, '2025-07-01 13:42:31');

-- --------------------------------------------------------

--
-- Table structure for table `audit_log`
--

CREATE TABLE `audit_log` (
  `audit_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user_type` enum('employee','customer') NOT NULL,
  `action` varchar(50) NOT NULL,
  `table_name` varchar(100) NOT NULL,
  `row_id` int(11) DEFAULT NULL,
  `old_data` text,
  `new_data` text,
  `action_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `common_services`
--

CREATE TABLE `common_services` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `service_description` varchar(255) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `common_services`
--

INSERT INTO `common_services` (`service_id`, `service_name`, `service_description`, `category_id`, `price`) VALUES
(1, 'Oil Change', 'Complete oil and filter change', NULL, '50.00'),
(2, 'Brake Inspection', 'Full brake system inspection', NULL, '30.00'),
(3, 'Tire Rotation', 'Rotate all four tires', NULL, '25.00'),
(4, 'Battery Replacement', 'Replace car battery', NULL, '80.00'),
(5, 'Engine Diagnostic', 'Comprehensive engine diagnostic check', NULL, '70.00'),
(6, 'Transmission Service', 'Transmission fluid change and inspection', NULL, '120.00'),
(7, 'Air Filter Replacement', 'Replace engine air filter', NULL, '20.00'),
(8, 'Cabin Filter Replacement', 'Replace cabin air filter', NULL, '25.00'),
(9, 'Coolant Flush', 'Flush and replace engine coolant', NULL, '60.00'),
(10, 'Spark Plug Replacement', 'Replace spark plugs', NULL, '45.00'),
(11, 'Wheel Alignment', 'Adjust wheel alignment for optimal handling', NULL, '80.00'),
(12, 'AC Recharge', 'Recharge air conditioning system', NULL, '90.00'),
(13, 'Wiper Blade Replacement', 'Replace windshield wiper blades', NULL, '15.00'),
(14, 'Headlight Restoration', 'Restore clarity to headlights', NULL, '40.00'),
(15, 'Fuel System Cleaning', 'Clean fuel injectors and system', NULL, '65.00'),
(16, 'Power Steering Service', 'Flush and replace power steering fluid', NULL, '55.00'),
(17, 'Exhaust System Repair', 'Inspect and repair exhaust system', NULL, '100.00'),
(18, 'Timing Belt Replacement', 'Replace timing belt', NULL, '250.00'),
(19, 'Radiator Replacement', 'Replace radiator', NULL, '200.00'),
(20, 'Shock/Strut Replacement', 'Replace shocks or struts', NULL, '180.00'),
(21, 'Serpentine Belt Replacement', 'Replace serpentine belt', NULL, '35.00'),
(22, 'Door Lock Repair', 'Repair or replace door locks', NULL, '60.00'),
(23, 'Window Regulator Repair', 'Repair or replace window regulator', NULL, '75.00'),
(24, 'Battery Terminal Cleaning', 'Clean battery terminals and cables', NULL, '10.00');

-- --------------------------------------------------------

--
-- Table structure for table `company_roles`
--

CREATE TABLE `company_roles` (
  `company_role_id` int(11) NOT NULL,
  `company_role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `company_roles`
--

INSERT INTO `company_roles` (`company_role_id`, `company_role_name`) VALUES
(3, 'Admin'),
(1, 'Employee'),
(2, 'Manager');

-- --------------------------------------------------------

--
-- Table structure for table `customer_identifier`
--

CREATE TABLE `customer_identifier` (
  `customer_id` int(11) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone_number` varchar(255) NOT NULL,
  `customer_added_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `customer_hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer_identifier`
--

INSERT INTO `customer_identifier` (`customer_id`, `customer_email`, `customer_phone_number`, `customer_added_date`, `customer_hash`) VALUES
(1, 'berekethabtamu599@gmail.com', '0925663434', '2025-06-29 21:08:37', 'a07e6866-60ff-46e9-892a-e755f2b05887');

-- --------------------------------------------------------

--
-- Table structure for table `customer_info`
--

CREATE TABLE `customer_info` (
  `customer_info_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `customer_first_name` varchar(255) NOT NULL,
  `customer_last_name` varchar(255) NOT NULL,
  `active_customer_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer_info`
--

INSERT INTO `customer_info` (`customer_info_id`, `customer_id`, `customer_first_name`, `customer_last_name`, `active_customer_status`) VALUES
(1, 1, 'Bereket', 'Habtamu', 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer_vehicle_info`
--

CREATE TABLE `customer_vehicle_info` (
  `vehicle_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `vehicle_year` int(11) NOT NULL,
  `vehicle_make` varchar(255) NOT NULL,
  `vehicle_model` varchar(255) NOT NULL,
  `vehicle_type` varchar(255) NOT NULL,
  `vehicle_mileage` int(11) NOT NULL,
  `vehicle_tag` varchar(255) NOT NULL,
  `vehicle_serial` varchar(255) NOT NULL,
  `vehicle_color` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL,
  `employee_email` varchar(255) NOT NULL,
  `active_employee` int(11) NOT NULL,
  `added_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `employee_email`, `active_employee`, `added_date`) VALUES
(1, 'admin@admin.com', 1, '2025-06-29 21:05:54'),
(2, 'berekethabtamu2121@gmail.com', 1, '2025-06-29 21:08:09'),
(3, 'berekethabtamu@gmail.com', 1, '2025-06-29 21:26:28');

-- --------------------------------------------------------

--
-- Table structure for table `employee_info`
--

CREATE TABLE `employee_info` (
  `employee_info_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `employee_first_name` varchar(255) NOT NULL,
  `employee_last_name` varchar(255) NOT NULL,
  `employee_phone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employee_info`
--

INSERT INTO `employee_info` (`employee_info_id`, `employee_id`, `employee_first_name`, `employee_last_name`, `employee_phone`) VALUES
(1, 1, 'Admin', 'Admin', '555-555-5555'),
(2, 2, 'Bereket', 'Habtamu', '0925663434'),
(3, 3, 'Bereket', 'Habtamu', '0925663434');

-- --------------------------------------------------------

--
-- Table structure for table `employee_pass`
--

CREATE TABLE `employee_pass` (
  `employee_pass_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `employee_password_hashed` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employee_pass`
--

INSERT INTO `employee_pass` (`employee_pass_id`, `employee_id`, `employee_password_hashed`) VALUES
(1, 1, '$2b$10$v/fRJy3UJGAsM/eTdyYZh.G8xGAPu1JZyAyBTw9OoFS0bZ8r3Afjy'),
(2, 2, '$2b$10$FqKB4jSYTtEtcLkRTiOu/ukNS0bJRMSAvaByscP7iysOs/TcE5DyW'),
(3, 3, '$2b$10$fjB5RuUIS5rCkdt8QOu3teUcyo0rvXT8pdDWm.tvl6.reGcHfF0eW');

-- --------------------------------------------------------

--
-- Table structure for table `employee_role`
--

CREATE TABLE `employee_role` (
  `employee_role_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `company_role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employee_role`
--

INSERT INTO `employee_role` (`employee_role_id`, `employee_id`, `company_role_id`) VALUES
(1, 1, 3),
(2, 2, 1),
(3, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `employee_work_hours`
--

CREATE TABLE `employee_work_hours` (
  `work_hour_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `work_date` date NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `total_hours` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `maintenance_space`
--

CREATE TABLE `maintenance_space` (
  `space_id` int(11) NOT NULL,
  `space_name` varchar(255) NOT NULL,
  `space_status` enum('available','occupied') NOT NULL DEFAULT 'available',
  `space_notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `maintenance_space`
--

INSERT INTO `maintenance_space` (`space_id`, `space_name`, `space_status`, `space_notes`) VALUES
(1, 'Space 1', 'available', 'door 1'),
(2, 'Space 2', 'available', 'door 1'),
(3, 'Space 3', 'available', 'door 1'),
(4, 'Space 4', 'available', 'door 1'),
(5, 'Space 5', 'available', 'door 1'),
(10, 'Space 6', 'available', 'door 1');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `active_order` int(11) NOT NULL,
  `order_hash` varchar(255) NOT NULL,
  `order_description` varchar(255) DEFAULT NULL,
  `space_id` int(11) DEFAULT NULL,
  `assigned_employee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order_info`
--

CREATE TABLE `order_info` (
  `order_info_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `order_total_price` int(11) NOT NULL,
  `estimated_completion_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `completion_date` datetime DEFAULT NULL,
  `additional_request` text,
  `notes_for_internal_use` text,
  `notes_for_customer` text,
  `additional_requests_completed` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order_services`
--

CREATE TABLE `order_services` (
  `order_service_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `service_completed` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `order_status_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `order_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `permission_requests`
--

CREATE TABLE `permission_requests` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `reason` text,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  `response_message` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `reviewed_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `permission_requests`
--

INSERT INTO `permission_requests` (`id`, `employee_id`, `start_date`, `end_date`, `start_time`, `end_time`, `reason`, `status`, `response_message`, `created_at`, `reviewed_at`, `reviewed_by`) VALUES
(1, 2, '2025-07-01', '2025-07-17', '08:00:00', '10:30:00', 'vac', 'accepted', 'ok', '2025-07-01 10:43:05', '2025-07-01 10:43:42', 1);

-- --------------------------------------------------------

--
-- Table structure for table `service_category`
--

CREATE TABLE `service_category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_make`
--

CREATE TABLE `vehicle_make` (
  `make_id` int(11) NOT NULL,
  `make_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_model`
--

CREATE TABLE `vehicle_model` (
  `model_id` int(11) NOT NULL,
  `make_id` int(11) DEFAULT NULL,
  `model_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`announcement_id`);

--
-- Indexes for table `announcement_reads`
--
ALTER TABLE `announcement_reads`
  ADD PRIMARY KEY (`announcement_id`,`employee_id`);

--
-- Indexes for table `audit_log`
--
ALTER TABLE `audit_log`
  ADD PRIMARY KEY (`audit_id`);

--
-- Indexes for table `common_services`
--
ALTER TABLE `common_services`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `company_roles`
--
ALTER TABLE `company_roles`
  ADD PRIMARY KEY (`company_role_id`),
  ADD UNIQUE KEY `company_role_name` (`company_role_name`);

--
-- Indexes for table `customer_identifier`
--
ALTER TABLE `customer_identifier`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `customer_email` (`customer_email`);

--
-- Indexes for table `customer_info`
--
ALTER TABLE `customer_info`
  ADD PRIMARY KEY (`customer_info_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `customer_vehicle_info`
--
ALTER TABLE `customer_vehicle_info`
  ADD PRIMARY KEY (`vehicle_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD UNIQUE KEY `employee_email` (`employee_email`);

--
-- Indexes for table `employee_info`
--
ALTER TABLE `employee_info`
  ADD PRIMARY KEY (`employee_info_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `employee_pass`
--
ALTER TABLE `employee_pass`
  ADD PRIMARY KEY (`employee_pass_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `employee_role`
--
ALTER TABLE `employee_role`
  ADD PRIMARY KEY (`employee_role_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `company_role_id` (`company_role_id`);

--
-- Indexes for table `employee_work_hours`
--
ALTER TABLE `employee_work_hours`
  ADD PRIMARY KEY (`work_hour_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `maintenance_space`
--
ALTER TABLE `maintenance_space`
  ADD PRIMARY KEY (`space_id`),
  ADD UNIQUE KEY `space_name` (`space_name`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `vehicle_id` (`vehicle_id`),
  ADD KEY `assigned_employee_id` (`assigned_employee_id`);

--
-- Indexes for table `order_info`
--
ALTER TABLE `order_info`
  ADD PRIMARY KEY (`order_info_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `order_services`
--
ALTER TABLE `order_services`
  ADD PRIMARY KEY (`order_service_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`order_status_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `permission_requests`
--
ALTER TABLE `permission_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `service_category`
--
ALTER TABLE `service_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `vehicle_make`
--
ALTER TABLE `vehicle_make`
  ADD PRIMARY KEY (`make_id`);

--
-- Indexes for table `vehicle_model`
--
ALTER TABLE `vehicle_model`
  ADD PRIMARY KEY (`model_id`),
  ADD KEY `make_id` (`make_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `announcement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `audit_log`
--
ALTER TABLE `audit_log`
  MODIFY `audit_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `common_services`
--
ALTER TABLE `common_services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `company_roles`
--
ALTER TABLE `company_roles`
  MODIFY `company_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customer_identifier`
--
ALTER TABLE `customer_identifier`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer_info`
--
ALTER TABLE `customer_info`
  MODIFY `customer_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer_vehicle_info`
--
ALTER TABLE `customer_vehicle_info`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee_info`
--
ALTER TABLE `employee_info`
  MODIFY `employee_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee_pass`
--
ALTER TABLE `employee_pass`
  MODIFY `employee_pass_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee_role`
--
ALTER TABLE `employee_role`
  MODIFY `employee_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee_work_hours`
--
ALTER TABLE `employee_work_hours`
  MODIFY `work_hour_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `maintenance_space`
--
ALTER TABLE `maintenance_space`
  MODIFY `space_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_info`
--
ALTER TABLE `order_info`
  MODIFY `order_info_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_services`
--
ALTER TABLE `order_services`
  MODIFY `order_service_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `order_status_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permission_requests`
--
ALTER TABLE `permission_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `service_category`
--
ALTER TABLE `service_category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vehicle_make`
--
ALTER TABLE `vehicle_make`
  MODIFY `make_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vehicle_model`
--
ALTER TABLE `vehicle_model`
  MODIFY `model_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer_info`
--
ALTER TABLE `customer_info`
  ADD CONSTRAINT `customer_info_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier` (`customer_id`);

--
-- Constraints for table `customer_vehicle_info`
--
ALTER TABLE `customer_vehicle_info`
  ADD CONSTRAINT `customer_vehicle_info_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier` (`customer_id`);

--
-- Constraints for table `employee_info`
--
ALTER TABLE `employee_info`
  ADD CONSTRAINT `employee_info_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`);

--
-- Constraints for table `employee_pass`
--
ALTER TABLE `employee_pass`
  ADD CONSTRAINT `employee_pass_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`);

--
-- Constraints for table `employee_role`
--
ALTER TABLE `employee_role`
  ADD CONSTRAINT `employee_role_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `employee_role_ibfk_2` FOREIGN KEY (`company_role_id`) REFERENCES `company_roles` (`company_role_id`);

--
-- Constraints for table `employee_work_hours`
--
ALTER TABLE `employee_work_hours`
  ADD CONSTRAINT `employee_work_hours_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `employee_work_hours_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `employee_work_hours_ibfk_3` FOREIGN KEY (`vehicle_id`) REFERENCES `customer_vehicle_info` (`vehicle_id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier` (`customer_id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`vehicle_id`) REFERENCES `customer_vehicle_info` (`vehicle_id`),
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`assigned_employee_id`) REFERENCES `employee` (`employee_id`);

--
-- Constraints for table `order_info`
--
ALTER TABLE `order_info`
  ADD CONSTRAINT `order_info_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `order_services`
--
ALTER TABLE `order_services`
  ADD CONSTRAINT `order_services_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `common_services` (`service_id`);

--
-- Constraints for table `order_status`
--
ALTER TABLE `order_status`
  ADD CONSTRAINT `order_status_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `permission_requests`
--
ALTER TABLE `permission_requests`
  ADD CONSTRAINT `permission_requests_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`);

--
-- Constraints for table `vehicle_model`
--
ALTER TABLE `vehicle_model`
  ADD CONSTRAINT `vehicle_model_ibfk_1` FOREIGN KEY (`make_id`) REFERENCES `vehicle_make` (`make_id`);
--
-- Database: `bekii`
--
CREATE DATABASE IF NOT EXISTS `bekii` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `bekii`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `username`, `password`) VALUES
(1, 'berekethabtamu2121@gmail.com', 'assa127367', 'beki'),
(2, 'berekethabtamu2121@gmail.com', 'assa127367', 'beki'),
(3, 'berekethabtamu2121@gmail.com', 'assa127367', 'bek'),
(4, 'berekethabtamu2121@gmail.com', 'assa127367', 'beki'),
(5, 'berekethabtamu599@gmail.com', 'beki25', 'beki123'),
(6, 'berekethabtamu599@gmail.com', 'beki25', 'beki123'),
(7, 'berekethabtamu599@gmail.com', 'beki25', 'beki123'),
(8, 'berekethabtamu599@gmail.com', 'beki25', 'beki123'),
(9, 'berekethabtamu2121@gmail.com', 'bereket@estictsolution.et', 'beki123456'),
(10, 'berekethabtamu2121@gmail.com', 'assa127367', '1234'),
(11, 'berekethabtamu599@gmail.com', 'assa127367', '12'),
(12, 'berekethabtamu21@gmail.com', 'qw', 'qwe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- Database: `bereket`
--
CREATE DATABASE IF NOT EXISTS `bereket` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `bereket`;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `address_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`address_id`, `customer_id`, `address`) VALUES
(2, 2, 'Addis Abeba'),
(3, 3, 'Addis Abeba'),
(4, 4, 'Addis'),
(5, 5, 'g');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `company_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `company` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`company_id`, `customer_id`, `company`) VALUES
(2, 2, 'EST'),
(3, 3, 'EST'),
(4, 4, 'smart'),
(5, 5, 'e');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `name`) VALUES
(2, 'Bereket '),
(3, 'Bereket Habtamu'),
(4, 'Habtamu'),
(5, 'asu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`company_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);

--
-- Constraints for table `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `company_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);
--
-- Database: `evangadi-db`
--
CREATE DATABASE IF NOT EXISTS `evangadi-db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `evangadi-db`;

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `answerid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `questionid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `rating_count` int(11) DEFAULT '0',
  `upvote_count` int(11) DEFAULT '0',
  `downvote_count` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`answerid`, `userid`, `questionid`, `answer`, `createdAt`, `rating_count`, `upvote_count`, `downvote_count`) VALUES
(1, 1, '2bfb32bb88aabd2f5f38', 'h', '2025-06-20 12:44:25', 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `answer_ratings`
--

CREATE TABLE `answer_ratings` (
  `ratingid` int(11) NOT NULL,
  `answerid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `vote_type` tinyint(4) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `answer_ratings`
--

INSERT INTO `answer_ratings` (`ratingid`, `answerid`, `userid`, `vote_type`, `createdAt`) VALUES
(1, 1, 1, 1, '2025-06-20 12:44:29');

-- --------------------------------------------------------

--
-- Table structure for table `chat_history`
--

CREATE TABLE `chat_history` (
  `id` int(11) NOT NULL,
  `session_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `role` enum('user','model') COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chat_history`
--

INSERT INTO `chat_history` (`id`, `session_id`, `userid`, `role`, `content`, `timestamp`) VALUES
(1, '5e933679-6bf5-4d76-9dfe-979a7c66ba8f', NULL, 'user', 'hi', '2025-06-20 19:53:21'),
(2, '5e933679-6bf5-4d76-9dfe-979a7c66ba8f', NULL, 'model', 'Hi there! How can I help you today?\n', '2025-06-20 19:53:23'),
(3, '5e933679-6bf5-4d76-9dfe-979a7c66ba8f', NULL, 'user', 'hi', '2025-06-20 19:53:28'),
(4, '5e933679-6bf5-4d76-9dfe-979a7c66ba8f', NULL, 'model', 'Hi again!  What\'s up?\n', '2025-06-20 19:53:29'),
(5, '5e933679-6bf5-4d76-9dfe-979a7c66ba8f', NULL, 'user', 'where u', '2025-06-20 19:53:55'),
(6, '5e933679-6bf5-4d76-9dfe-979a7c66ba8f', NULL, 'user', 'yes', '2025-06-20 19:54:06'),
(7, '5e933679-6bf5-4d76-9dfe-979a7c66ba8f', NULL, 'model', 'Yes to what?  Please ask your question.\n', '2025-06-20 19:54:07'),
(8, '95f7bade-b5b0-4b39-98d5-5b3b6f3ee48b', NULL, 'user', 'good evenin', '2025-06-20 19:59:02'),
(9, '95f7bade-b5b0-4b39-98d5-5b3b6f3ee48b', NULL, 'model', 'Good evening to you too!\n', '2025-06-20 19:59:03'),
(10, '95f7bade-b5b0-4b39-98d5-5b3b6f3ee48b', NULL, 'user', 'what is react', '2025-06-20 19:59:15'),
(11, '95f7bade-b5b0-4b39-98d5-5b3b6f3ee48b', NULL, 'model', 'React is a free and open-source front-end JavaScript library for building user interfaces (UIs) based on UI components.  It\'s maintained by Meta (formerly Facebook) and a community of individual developers and companies.\n\nHere\'s a breakdown of what makes React special:\n\n* **Component-Based Architecture:** React breaks down complex UIs into smaller, reusable components.  This makes code more organized, easier to maintain, and simpler to debug.  Each component manages its own state and rendering logic.\n\n* **Virtual DOM:** React uses a virtual DOM (Document Object Model) which is a lightweight representation of the actual DOM.  When changes occur, React compares the virtual DOM with the real DOM and only updates the necessary parts of the real DOM, leading to significant performance improvements.\n\n* **JSX:** React uses JSX, a syntax extension to JavaScript that allows you to write HTML-like code within your JavaScript. This makes the code more readable and easier to', '2025-06-20 19:59:17'),
(12, '5e933679-6bf5-4d76-9dfe-979a7c66ba8f', NULL, 'user', 'hi', '2025-06-20 20:08:43'),
(13, '5e933679-6bf5-4d76-9dfe-979a7c66ba8f', NULL, 'model', 'Hi there!  How can I help you today?\n', '2025-06-20 20:08:45'),
(14, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'user', 'hi', '2025-06-20 20:12:20'),
(15, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'model', 'Hi there! How can I help you today?\n', '2025-06-20 20:12:21'),
(16, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'user', 'thanks to god', '2025-06-20 20:12:29'),
(17, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'model', 'You\'re welcome.  Is there anything I can help you with?\n', '2025-06-20 20:12:30'),
(18, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'user', 'ok', '2025-06-20 20:17:04'),
(19, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'model', 'Okay!  Let me know if you need anything.\n', '2025-06-20 20:17:05'),
(20, 'b458e4ff-fc31-4947-8f80-fd961affb649', NULL, 'user', 'hi', '2025-06-20 20:18:42'),
(21, 'b458e4ff-fc31-4947-8f80-fd961affb649', NULL, 'model', 'Hi there! How can I help you today?\n', '2025-06-20 20:18:44'),
(22, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'user', 'generate a fullstack question', '2025-06-20 20:21:45'),
(23, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'model', 'Design a full-stack application for a simple to-do list.  The application should allow users to:\n\n* **Create:** Add new to-do items with a description and a due date.\n* **Read:** View all their to-do items, sorted by due date (ascending).\n* **Update:** Mark to-do items as complete or incomplete, and edit their descriptions and due dates.\n* **Delete:** Remove to-do items.\n* **Authentication:**  Users should be able to create accounts and securely log in.\n\nConsider the following aspects in your answer:\n\n* **Frontend:**  What technologies would you use (e.g., React, Angular, Vue, etc.)?  Describe the structure of the frontend components and how they interact with the backend.  How would you handle user interface updates after actions like creating or deleting a to-do item?\n* **Backend:** What technologies would you use (e.g., Node.', '2025-06-20 20:21:48'),
(24, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'user', 'hi', '2025-06-20 20:36:27'),
(25, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'model', 'Hi there! How can I help you today?\n', '2025-06-20 20:36:28'),
(26, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'user', 'good evening', '2025-06-20 20:39:43'),
(27, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'model', 'Good evening to you too!  How can I help you this evening?\n', '2025-06-20 20:39:44'),
(28, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'user', 'alesh', '2025-06-20 20:55:06'),
(29, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'model', 'Is there something you\'d like to know or discuss about Alesha?  I need more information to be helpful.  For example, are you looking for information about a person named Alesha, a place, or something else?\n', '2025-06-20 20:55:07'),
(30, '454669fe-566a-47eb-8681-3ebfa78163f8', NULL, 'user', 'hi', '2025-06-20 21:08:23'),
(31, '454669fe-566a-47eb-8681-3ebfa78163f8', NULL, 'model', 'Hi there! How can I help you today?\n', '2025-06-20 21:08:26'),
(32, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'user', 'hi', '2025-06-20 21:27:24'),
(33, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'model', 'Hi there! How can I help you today?\n', '2025-06-20 21:27:25'),
(34, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'user', 'good evenig', '2025-06-20 21:50:06'),
(35, '4a98556d-3a38-4266-b6a1-68d82d4da6f0', NULL, 'model', 'Good evening to you too!  How can I help you?\n', '2025-06-20 21:50:08'),
(36, '255b1f6e-65d9-4306-b9c3-cc137cb51c26', NULL, 'user', 'ok', '2025-06-21 14:33:29'),
(37, '255b1f6e-65d9-4306-b9c3-cc137cb51c26', NULL, 'model', 'Okay.  Is there anything I can help you with?\n', '2025-06-21 14:33:31');

-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `message_id` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar_url` varchar(2048) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message_text` text COLLATE utf8mb4_unicode_ci,
  `room_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message_type` enum('public','private') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'public',
  `recipient_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `edited_at` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `reactions` json DEFAULT NULL,
  `file_data` longtext COLLATE utf8mb4_unicode_ci,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `audio_data` longtext COLLATE utf8mb4_unicode_ci,
  `audio_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `audio_duration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chat_messages`
--

INSERT INTO `chat_messages` (`message_id`, `userid`, `username`, `avatar_url`, `message_text`, `room_id`, `message_type`, `recipient_id`, `created_at`, `edited_at`, `is_deleted`, `reactions`, `file_data`, `file_name`, `file_type`, `audio_data`, `audio_type`, `audio_duration`) VALUES
(1, 1, 'beki', NULL, 'h', 'stackoverflow_lobby', 'public', NULL, '2025-06-20 12:44:36', NULL, 0, '[{\"emoji\": \"❤️\", \"userids\": [1], \"usernames\": [\"beki\"]}]', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `questionid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userid` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `solution_answer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `username` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar_url` varchar(2048) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT '0',
  `verification_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token_expires_at` datetime DEFAULT NULL,
  `reset_password_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reset_password_expires` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_seen` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `username`, `firstname`, `lastname`, `email`, `password`, `avatar_url`, `is_verified`, `verification_token`, `token_expires_at`, `reset_password_token`, `reset_password_expires`, `createdAt`, `last_seen`) VALUES
(1, 'beki', 'Bereket', 'Habtamu', 'berekethabtamu2121@gmail.com', '$2b$10$NfKqgkKWnMS.N15VXMdQIeAqjYdAhDAs1nz6Pwmnpjo1jiwKzmvPy', NULL, 1, NULL, NULL, NULL, NULL, '2025-06-20 12:42:46', '2025-06-21 14:44:51'),
(2, 'abebe', 'Bereket', 'Habtamu', 'berekethabtamu599@gmail.com', '$2b$10$cKbMu1kapg7l28C4qj/iX.aFeWO61zr4g/PZY0wWcWT3Z/aZ72KZ.', NULL, 1, NULL, NULL, NULL, NULL, '2025-06-20 13:37:11', '2025-06-21 14:45:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`answerid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `answer_ratings`
--
ALTER TABLE `answer_ratings`
  ADD PRIMARY KEY (`ratingid`),
  ADD UNIQUE KEY `answerid` (`answerid`,`userid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `chat_history`
--
ALTER TABLE `chat_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `userid` (`userid`),
  ADD KEY `recipient_id` (`recipient_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `questionid` (`questionid`),
  ADD KEY `userid` (`userid`),
  ADD KEY `solution_answer_id` (`solution_answer_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `verification_token` (`verification_token`),
  ADD UNIQUE KEY `reset_password_token` (`reset_password_token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `answerid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `answer_ratings`
--
ALTER TABLE `answer_ratings`
  MODIFY `ratingid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `chat_history`
--
ALTER TABLE `chat_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE;

--
-- Constraints for table `answer_ratings`
--
ALTER TABLE `answer_ratings`
  ADD CONSTRAINT `answer_ratings_ibfk_1` FOREIGN KEY (`answerid`) REFERENCES `answers` (`answerid`) ON DELETE CASCADE,
  ADD CONSTRAINT `answer_ratings_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE;

--
-- Constraints for table `chat_history`
--
ALTER TABLE `chat_history`
  ADD CONSTRAINT `chat_history_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE SET NULL;

--
-- Constraints for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD CONSTRAINT `chat_messages_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE SET NULL,
  ADD CONSTRAINT `chat_messages_ibfk_2` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`userid`) ON DELETE SET NULL;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE,
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`solution_answer_id`) REFERENCES `answers` (`answerid`) ON DELETE SET NULL;
--
-- Database: `evangadi-forum`
--
CREATE DATABASE IF NOT EXISTS `evangadi-forum` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `evangadi-forum`;
--
-- Database: `evangadi-table`
--
CREATE DATABASE IF NOT EXISTS `evangadi-table` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `evangadi-table`;
--
-- Database: `mydbb`
--
CREATE DATABASE IF NOT EXISTS `mydbb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `mydbb`;

-- --------------------------------------------------------

--
-- Table structure for table `order_table`
--

CREATE TABLE `order_table` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products_table`
--

CREATE TABLE `products_table` (
  `product_id` int(11) NOT NULL,
  `product_url` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product_description_table`
--

CREATE TABLE `product_description_table` (
  `description_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_brief_description` varchar(400) NOT NULL,
  `product_description` varchar(400) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product_price_table`
--

CREATE TABLE `product_price_table` (
  `price_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `starting_price` varchar(255) NOT NULL,
  `price_range` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order_table`
--
ALTER TABLE `order_table`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `products_table`
--
ALTER TABLE `products_table`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_description_table`
--
ALTER TABLE `product_description_table`
  ADD PRIMARY KEY (`description_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_price_table`
--
ALTER TABLE `product_price_table`
  ADD PRIMARY KEY (`price_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order_table`
--
ALTER TABLE `order_table`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products_table`
--
ALTER TABLE `products_table`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_description_table`
--
ALTER TABLE `product_description_table`
  MODIFY `description_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_price_table`
--
ALTER TABLE `product_price_table`
  MODIFY `price_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_table`
--
ALTER TABLE `order_table`
  ADD CONSTRAINT `order_table_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products_table` (`product_id`),
  ADD CONSTRAINT `order_table_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`);

--
-- Constraints for table `product_description_table`
--
ALTER TABLE `product_description_table`
  ADD CONSTRAINT `product_description_table_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products_table` (`product_id`);

--
-- Constraints for table `product_price_table`
--
ALTER TABLE `product_price_table`
  ADD CONSTRAINT `product_price_table_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products_table` (`product_id`);
--
-- Database: `signup`
--
CREATE DATABASE IF NOT EXISTS `signup` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `signup`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`) VALUES
(1, 'beki', 'berekethabtamu2121@gmail.com', '$2b$10$Xzdqcqtiad3TeqH647pfluHHNoVMYbsGHinYOP4UViJGrcQTFldgi'),
(3, 'titi', 'berekethabtamu21@gmail.com', '$2b$10$D4Ckfo57qeKADIoqZD8MVOSQZX4nljiG53/6P0dNVI/AMb6ZzdPW2'),
(5, 'beki1', 'berekethabtamu@gmail.com', '$2b$10$GIDvBVw1SjHZiQIMzS0nguf2jSwRw6F8w460AOopB0khaeYAcCKbq');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
