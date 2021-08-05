-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2021 at 12:24 AM
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
(7, 'Dinners', 0),
(8, 'Drinks', 1),
(10, 'Brunch', 0);

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
(1, 'Tortillas', 'Package', 2, 2, 8, 2, 'uploads/ingredients/653-tortillas-maiz.jpg', 1),
(2, 'Aceite', 'Bottle', 20, 10, 50, 15, 'uploads/ingredients/257-aceite.jpg', 1),
(3, 'Zanahoria', 'Pz', 6, 5, 50, 5, 'uploads/ingredients/802-download.jpg', 1);

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
(13, 'Omelette', 75, 'Omelette with cheese and vegetables', 5, 0, 0, 0, '', 'uploads/meals/504-omelette.jpg', 0, 0),
(14, 'Scrambled Eggs', 50, 'Scrambled Eggs with bread', 5, 0, 0, 0, '', 'uploads/meals/628-scrambled-eggs.jpg', 0, 1),
(15, 'Milkshake', 55, 'Milkshakes: Chocolate, Vanilla, Strawberries', 8, 0, 0, 0, '', 'uploads/meals/206-milkshake.jpg', 0, 1),
(16, 'Milk', 20, 'Glass of milk', 8, 0, 0, 0, '', 'uploads/meals/785-milk.jpg', 0, 1),
(17, 'Ice Coffee', 30, 'Ice coffee', 8, 0, 0, 0, '', 'uploads/meals/278-ice-coffee.jpg', 0, 1),
(18, 'Coffee', 25, 'Refill includes', 8, 0, 0, 0, '', 'uploads/meals/8-coffee.jpg', 0, 1),
(19, 'Orange Juice', 15, 'Homemade orange juice', 8, 0, 0, 0, '', 'uploads/meals/917-orange-juice.jpg', 0, 1),
(20, 'Boneless', 85, 'Ricas Boneless caseras, elige tu salsa preferida ( Chipotle, Mango-Habanero, Bufalo, Teriyaki)', 3, 0, 0, 0, '', 'uploads/meals/415-boneless.jpg', 0, 1),
(21, 'Nachos con carne', 100, 'Nachos con carne para dos personas', 3, 0, 0, 0, '', 'uploads/meals/359-nachos.jpg', 0, 1),
(22, 'Ensalada de la casa', 90, 'Rica ensalada con aderezo de la casa', 4, 0, 0, 0, '', 'uploads/meals/735-ensalada.jpg', 0, 1),
(23, 'Ensalada con pollo', 60, 'Ensalada con fajitas de pollo a la parrilla', 4, 0, 0, 0, '', 'uploads/meals/0-deberias-comer-ensalada-para-desayunar.jpg', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `message_title` varchar(100) NOT NULL,
  `message_body` text NOT NULL,
  `message_from` varchar(150) NOT NULL,
  `message_date` datetime NOT NULL COMMENT 'UTC Date',
  `message_seen` tinyint(1) NOT NULL DEFAULT 0,
  `message_seen_date` datetime NOT NULL COMMENT 'UTC Date',
  `message_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `message_title`, `message_body`, `message_from`, `message_date`, `message_seen`, `message_seen_date`, `message_active`) VALUES
(1, 'Example Title Juan', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget fermentum purus, ac bibendum felis. Donec ante lorem, interdum at malesuada non, ornare ornare dolor. Nam dignissim ullamcorper turpis sit amet congue. Integer et felis rhoncus, tincidunt leo non, sagittis mauris. Nulla libero urna, pretium a hendrerit nec, venenatis non elit. Donec eu felis pellentesque, eleifend urna at, lobortis massa. Curabitur a malesuada est. Aliquam vulputate enim mi, vel pulvinar massa molestie et. Aliquam viverra massa ut orci porttitor, vel dictum lectus mollis. Phasellus eleifend at metus ac hendrerit.', 'Juan', '2021-07-28 05:23:13', 1, '2021-08-02 16:31:00', 1),
(2, 'Example Title Supplier', 'Maecenas efficitur aliquam est id ullamcorper. In euismod at velit in tempor. Nulla vulputate ornare blandit. Praesent molestie massa velit. Fusce consequat tristique sagittis. Donec ullamcorper nec enim eu vehicula. Morbi imperdiet justo mi, in luctus ex accumsan id. Curabitur sollicitudin fringilla ultricies. Sed a est sapien. Sed aliquet ante ut facilisis efficitur. Nunc tempus enim vel sem rutrum convallis.', 'Meat Supplier', '2021-07-28 00:23:13', 1, '2021-08-02 16:31:00', 1),
(3, 'Example Title Client', 'Praesent molestie velit magna, vitae eleifend dolor tempus sit amet. Donec et tempus justo. Praesent ut lectus mauris. Phasellus accumsan nisl eu sapien accumsan, vel faucibus massa sollicitudin. Morbi id condimentum mi. Vestibulum lacinia pretium lacus, at tincidunt nisi pharetra eget. Sed egestas tellus metus, vel dignissim est iaculis non.\n\nProin erat est, gravida ac ultricies luctus, dapibus pellentesque lacus. Ut porttitor facilisis nisl, pharetra molestie arcu placerat sed. Morbi pretium eros non augue aliquet, quis accumsan sapien tempus. Duis suscipit, dui eget faucibus cursus, arcu mauris pretium dui, eget bibendum sem nisi ac libero. Sed pharetra feugiat porta. Sed dignissim sit amet ipsum sit amet mollis. Curabitur auctor luctus velit. Vivamus arcu dolor, consequat vitae lacus at, pretium pulvinar orci.', 'Client', '2021-07-28 08:23:13', 1, '2021-08-02 16:31:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders_historial`
--

CREATE TABLE `orders_historial` (
  `order_historial_id` int(11) NOT NULL,
  `order_historial_date` datetime NOT NULL COMMENT 'UTC Format',
  `order_historial_status` tinyint(1) NOT NULL DEFAULT 0,
  `order_historial_payment` varchar(50) NOT NULL,
  `order_historial_amount` double NOT NULL,
  `order_historial_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders_historial`
--

INSERT INTO `orders_historial` (`order_historial_id`, `order_historial_date`, `order_historial_status`, `order_historial_payment`, `order_historial_amount`, `order_historial_active`) VALUES
(3, '2021-08-05 14:53:00', 1, 'money', 350, 1),
(4, '2021-08-05 22:05:08', 1, 'money', 170, 1),
(5, '2021-08-05 22:17:00', 1, 'Debit Card', 425, 1);

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
(1, 1, 2, 20),
(2, 1, 1, 21),
(3, 1, 2, 19),
(4, 2, 1, 22),
(5, 2, 1, 23),
(6, 2, 1, 11),
(7, 2, 2, 19),
(8, 2, 1, 17),
(9, 3, 2, 20),
(10, 3, 2, 23),
(11, 3, 2, 17),
(12, 4, 2, 20),
(13, 5, 2, 11),
(14, 5, 1, 12),
(15, 5, 1, 19),
(16, 5, 1, 17),
(17, 5, 1, 23);

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
(1, 'mespericueta', '$2a$10$MSHGe6cX6hSvNvi5LhR5OeZOVkKCHAtpIrN8Le3buRdlWya9hlDr6', 'martin.m.espericueta@gmail.com', 'Martin', 'Espericueta', 1, 'uploads/users/256-firefox_2018-07-10_07-50-11.png', 1),
(2, 'jgomez', '$2a$10$pPejSae/BDr0Md8rFRD6rOV7m8NvfU1aMNf2yjEe.g944oWRcLaTO', 'jgomez@gmail.com', 'Jose', 'Gomez', 0, 'uploads/users/no-user-image.gif', 1),
(3, 'louane', '$2a$10$VLrACOcoX1RHRL0kMeo/h.w.DPz0IPf5vhV9caKrUQgDoJdXKYcE.', 'apeichert@gmail.com', 'Anne', 'Peichert', 1, 'uploads/users/985-Louane-Emera.jpg', 1);

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
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `meals`
--
ALTER TABLE `meals`
  MODIFY `meal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders_historial`
--
ALTER TABLE `orders_historial`
  MODIFY `order_historial_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders_meals`
--
ALTER TABLE `orders_meals`
  MODIFY `order_meal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
