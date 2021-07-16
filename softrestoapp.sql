-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2021 at 01:44 AM
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

INSERT INTO `ingredients` (`ingredient_id`, `ingredient_name`, `ingredient_stock`, `ingredient_min_stock`, `ingredient_max_stock`, `ingredient_point_reorder`, `ingredient_image`, `ingredient_active`) VALUES
(1, 'Tortillas', 0, 0, 10000, 0, '', 1),
(2, 'Aceite', 0, 0, 10000, 0, '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `meals`
--

CREATE TABLE `meals` (
  `meal_id` int(11) NOT NULL,
  `meal_name` varchar(100) NOT NULL,
  `meal_cost` double NOT NULL DEFAULT 0,
  `meal_description` text DEFAULT NULL,
  `meal_picture` text NOT NULL,
  `meal_rating` int(11) NOT NULL DEFAULT 0,
  `meal_votes` int(11) NOT NULL DEFAULT 0,
  `meal_haVotado` text NOT NULL,
  `meal_image` text NOT NULL,
  `meal_soldout` tinyint(1) NOT NULL DEFAULT 0,
  `meal_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meals`
--

INSERT INTO `meals` (`meal_id`, `meal_name`, `meal_cost`, `meal_description`, `meal_picture`, `meal_rating`, `meal_votes`, `meal_haVotado`, `meal_image`, `meal_soldout`, `meal_active`) VALUES
(4, 'Chilaquiles', 80, 'Totopos artesanales banados en salsa roja o verde hecha en casa', '', 0, 0, '', '', 0, 1),
(5, 'Chilaquiles c/pollo', 90, 'Totopos artesanales banados en salsa roja o verde hecha en casa', '', 0, 0, '', '', 0, 1);

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
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `meals`
--
ALTER TABLE `meals`
  MODIFY `meal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
