-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 20, 2024 at 07:17 AM
-- Server version: 8.0.30
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web_nodejs_reactjs_dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(4, 'IPHONE', 'iphone', '2024-11-18 10:09:39', '2024-11-19 02:41:49'),
(7, 'SAMSUNG', 'sangsung', '2024-11-18 10:11:10', '2024-11-19 02:41:44'),
(9, 'XIAOMI', 'xiaomi', '2024-11-19 04:54:45', '2024-11-19 04:54:45');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `total_price` float NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int NOT NULL,
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` float NOT NULL,
  `total` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` float NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `categoryId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `categoryId`, `createdAt`, `updatedAt`) VALUES
(2, 'Samsung Galaxy S23 FE 5G999999999999999999999999999999999999999999999999999999999', 'Điện thoại Samsung Galaxy S23 FE 5G 8GB/128GB Xanh mint/Trắng', 10890000, 999, 7, '2024-11-19 03:24:36', '2024-11-20 06:48:37'),
(3, 'Samsung Galaxy S24 Ultra 5G', 'Điện thoại Samsung Galaxy S24 Ultra 5G 12GB/512GB', 33490000, 99, 7, '2024-11-19 03:34:34', '2024-11-19 04:53:06'),
(4, 'iPhone 16 Pro Max', 'Điện thoại iPhone 16 Pro Max 256GB', 34490000, 99, 4, '2024-11-19 03:39:03', '2024-11-19 04:53:54'),
(5, 'iPhone 15 Pro Max', 'Điện thoại iPhone 15 Pro Max 256GB', 29590000, 99, 4, '2024-11-19 03:39:16', '2024-11-19 04:54:30'),
(7, 'Xiaomi 14 Ultra 5G', 'Điện thoại Xiaomi 14 Ultra 5G 16GB/512GB\n\n\n    Hệ điều hành:\n    Android 14\n    Chip xử lý (CPU):\n    Snapdragon 8 Gen 3 8 nhân\n    Tốc độ CPU:\n    1 nhân 3.3 GHz, 3 nhân 3.2 GHz, 2 nhân 3 GHz & 2 nhân 2.3 GHz\n    Chip đồ họa (GPU):\n    Adreno 750\n    RAM:\n    16 GB\n    Dung lượng lưu trữ:\n    512 GB\n    Dung lượng còn lại (khả dụng) khoảng:\n    475 GB\n    Danh bạ:\n    Không giới hạn\n', 29990000, 99, 9, '2024-11-19 04:55:39', '2024-11-19 05:07:59');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` int DEFAULT '1',
  `refresh_token` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$NZji7EngQ1lzFNatFhH1f.55UYl9yjGVpOrilru8Jkh.n1cvJ8t3u', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6MCwiaWF0IjoxNzMyMDI5Mzk2LCJleHAiOjE3MzIxMTU3OTZ9.uwSfkaXPS43eut101OjCuykNs2BfMQFuwnfJXVKCwP8', '2024-11-18 09:31:59', '2024-11-19 15:16:36'),
(2, 'user1', 'user1@gmail.com', '$2b$12$JH4poakZfeOheG0iU0VLX.zNlkxfIZmeSvf58/5JIc0Z1xRUwBqfW', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsIm5hbWUiOiJ1c2VyMSIsImVtYWlsIjoidXNlcjFAZ21haWwuY29tIiwicm9sZSI6MSwiaWF0IjoxNzMyMDgxMjMwLCJleHAiOjE3MzIxNjc2MzB9.Ctpjny0HB8mhFfvB7pOlmweosTfkbmzetv9V69NDk9k', '2024-11-18 09:32:26', '2024-11-20 05:40:30'),
(3, 'user2', 'user2@gmail.com', '$2b$10$ZmKrkRGBPxLopjFC6sDl1OzBZ/6NdXDxqNdRO.8bIZ08NjiZ2N16W', 1, NULL, '2024-11-19 04:50:53', '2024-11-19 04:50:53'),
(4, 'user3', 'user3@gmail.com', '$2b$10$N1MSrfCzIchBPmHhzE5jpuUBO.sFpmzo/O47d0pgkpA/V.AfqgsDG', 1, NULL, '2024-11-19 15:08:22', '2024-11-19 15:08:22'),
(5, 'khanh', 'khanh@gmail.com', '$2b$10$TYZLW2dGNCDPJPyVAQ8jV.b5IYwO48uiFwgJEo0Mkfxj9v6QT1AH2', 1, NULL, '2024-11-19 15:30:47', '2024-11-19 15:31:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
