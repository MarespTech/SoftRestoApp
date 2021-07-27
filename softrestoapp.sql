-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2021 at 12:56 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `softrestoapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) DEFAULT NULL,
  `category_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `category_active`) VALUES
(3, 'Entries', 1),
(4, 'Salads', 1),
(5, 'Breakfast', 1),
(6, 'Meals', 1),
(7, 'Dinners', 1),
(8, 'Drinks', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `ingredient_id` int(11) NOT NULL,
  `ingredient_name` varchar(100) NOT NULL,
  `ingredient_measure` varchar(50) NOT NULL,
  `ingredient_stock` int(11) NOT NULL DEFAULT 0,
  `ingredient_min_stock` int(11) NOT NULL DEFAULT 0,
  `ingredient_max_stock` int(11) NOT NULL DEFAULT 10000,
  `ingredient_point_reorder` int(11) NOT NULL DEFAULT 0,
  `ingredient_image` text NOT NULL,
  `ingredient_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`ingredient_id`, `ingredient_name`, `ingredient_measure`, `ingredient_stock`, `ingredient_min_stock`, `ingredient_max_stock`, `ingredient_point_reorder`, `ingredient_image`, `ingredient_active`) VALUES
(1, 'Tortillas', 'Package', 3, 2, 8, 2, 'uploads/ingredients/653-tortillas-maiz.jpg', 1),
(2, 'Aceite', 'Bottle', 20, 10, 50, 15, 'uploads/ingredients/257-aceite.jpg', 1),
(3, 'Zanahoria', 'Pz', 5, 5, 50, 5, 'uploads/ingredients/802-download.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `meals`
--

CREATE TABLE `meals` (
  `meal_id` int(11) NOT NULL,
  `meal_name` varchar(100) NOT NULL,
  `meal_cost` double NOT NULL DEFAULT 0,
  `meal_description` text DEFAULT NULL,
  `meal_category` int(11) NOT NULL,
  `meal_recipe` int(11) NOT NULL DEFAULT 0,
  `meal_rating` float NOT NULL DEFAULT 0,
  `meal_votes` int(11) NOT NULL DEFAULT 0,
  `meal_haVotado` text NOT NULL,
  `meal_image` text NOT NULL,
  `meal_soldout` tinyint(1) NOT NULL DEFAULT 0,
  `meal_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meals`
--

INSERT INTO `meals` (`meal_id`, `meal_name`, `meal_cost`, `meal_description`, `meal_category`, `meal_recipe`, `meal_rating`, `meal_votes`, `meal_haVotado`, `meal_image`, `meal_soldout`, `meal_active`) VALUES
(4, 'Chilaquiles', 80, 'Totopos artesanales banados en salsa roja o verde hecha en casa', 5, 0, 3.5, 0, '', '/uploads/meals/775-chilaquiles.jpg', 0, 1),
(5, 'Chilaquiles c/pollo', 110, 'Totopos artesanales banados en salsa roja o verde hecha en casa acompanados con pollo y frijoles', 5, 0, 4.5, 3, '', 'uploads/meals/554-chilaquiles-pollo.jpg', 0, 1),
(11, 'Cheeseburger', 110, 'Simple and traditional cheeseburger', 6, 0, 0, 0, '', 'uploads/meals/951-cheeseburger.jpg', 0, 1),
(12, 'Spaghetti Bolognesa', 100, 'Traditional Italian Spaghetti with meatballs', 6, 0, 0, 0, '', 'uploads/meals/730-Weeknight-Spaghetti-Bolognese.jpg', 0, 1),
(13, 'Omelette', 75, 'Omelette with cheese and vegetables', 5, 0, 0, 0, '', 'uploads/meals/504-omelette.jpg', 0, 1),
(14, 'Scrambled Eggs', 50, 'Scrambled Eggs with bread', 5, 0, 0, 0, '', 'uploads/meals/628-scrambled-eggs.jpg', 0, 1),
(15, 'Milkshake', 55, 'Milkshakes: Chocolate, Vanilla, Strawberries', 8, 0, 0, 0, '', 'uploads/meals/206-milkshake.jpg', 0, 1),
(16, 'Milk', 20, 'Glass of milk', 8, 0, 0, 0, '', 'uploads/meals/785-milk.jpg', 0, 1),
(17, 'Ice Coffee', 30, 'Ice coffee', 8, 0, 0, 0, '', 'uploads/meals/278-ice-coffee.jpg', 0, 1),
(18, 'Coffee', 25, 'Refill includes', 8, 0, 0, 0, '', 'uploads/meals/8-coffee.jpg', 0, 1),
(19, 'Orange Juice', 15, 'Homemade orange juice', 8, 0, 0, 0, '', 'uploads/meals/917-orange-juice.jpg', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `message_title` varchar(100) NOT NULL,
  `message_body` text NOT NULL,
  `message_from` varchar(150) NOT NULL,
  `message_date` datetime NOT NULL,
  `message_seen` tinyint(1) NOT NULL DEFAULT 0,
  `message_seen_date` datetime NOT NULL,
  `message_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `message_title`, `message_body`, `message_from`, `message_date`, `message_seen`, `message_seen_date`, `message_active`) VALUES
(1, 'a', 'a', 'a', '2021-07-28 00:23:13', 0, '2021-07-28 00:23:13', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders_historial`
--

CREATE TABLE `orders_historial` (
  `order_historial_id` int(11) NOT NULL,
  `order_historial_date` datetime NOT NULL,
  `order_historial_payment` varchar(50) NOT NULL,
  `order_historial_amount` double NOT NULL,
  `order_historial_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders_historial`
--

INSERT INTO `orders_historial` (`order_historial_id`, `order_historial_date`, `order_historial_payment`, `order_historial_amount`, `order_historial_active`) VALUES
(4, '2021-07-28 15:34:34', 'Money', 300, 1),
(5, '2021-07-27 16:40:52', 'Money', 200, 1),
(6, '2021-07-27 17:42:45', 'Money', 450, 1),
(7, '2021-07-27 19:47:37', 'Money', 120, 1),
(9, '2021-07-27 15:34:34', 'Money', 300, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders_meals`
--

CREATE TABLE `orders_meals` (
  `order_meal_id` int(11) NOT NULL,
  `order_meal_historial` int(11) NOT NULL,
  `order_meal_qty` int(5) NOT NULL,
  `order_meal` int(11) NOT NULL COMMENT 'Insert id of meal to get data(name, cost) later'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders_meals`
--

INSERT INTO `orders_meals` (`order_meal_id`, `order_meal_historial`, `order_meal_qty`, `order_meal`) VALUES
(13, 4, 3, 5),
(14, 4, 1, 14),
(15, 4, 3, 18),
(16, 4, 1, 19),
(17, 5, 2, 5),
(18, 5, 1, 14),
(19, 5, 1, 18),
(20, 5, 1, 19),
(21, 6, 1, 5),
(22, 6, 1, 14),
(23, 6, 1, 18),
(24, 6, 1, 19),
(25, 7, 1, 5),
(26, 7, 1, 14),
(27, 7, 1, 18),
(28, 7, 1, 19);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_username` varchar(100) NOT NULL,
  `user_password` text NOT NULL,
  `user_email` text NOT NULL,
  `user_first_name` varchar(200) NOT NULL,
  `user_last_name` varchar(200) NOT NULL,
  `user_isadmin` tinyint(1) NOT NULL DEFAULT 0,
  `user_image` text NOT NULL,
  `user_active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_username`, `user_password`, `user_email`, `user_first_name`, `user_last_name`, `user_isadmin`, `user_image`, `user_active`) VALUES
(1, 'mespericueta', '$2a$10$pPejSae/BDr0Md8rFRD6rOV7m8NvfU1aMNf2yjEe.g944oWRcLaTO', 'martin.m.espericueta@gmail.com', 'Martin', 'Espericueta', 1, '', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`ingredient_id`);

--
-- Indexes for table `meals`
--
ALTER TABLE `meals`
  ADD PRIMARY KEY (`meal_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `orders_historial`
--
ALTER TABLE `orders_historial`
  ADD PRIMARY KEY (`order_historial_id`);

--
-- Indexes for table `orders_meals`
--
ALTER TABLE `orders_meals`
  ADD PRIMARY KEY (`order_meal_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_username` (`user_username`),
  ADD UNIQUE KEY `user_email` (`user_email`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `meals`
--
ALTER TABLE `meals`
  MODIFY `meal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders_historial`
--
ALTER TABLE `orders_historial`
  MODIFY `order_historial_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders_meals`
--
ALTER TABLE `orders_meals`
  MODIFY `order_meal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
