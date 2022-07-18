-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2022 at 12:18 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `MyPost`
--

-- --------------------------------------------------------

--
-- Table structure for table `Posts`
--

CREATE TABLE `Posts` (
  `PostID` bigint(128) NOT NULL,
  `PostTimeStamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `PostText` varchar(350) NOT NULL,
  `UserID` int(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Posts`
--

INSERT INTO `Posts` (`PostID`, `PostTimeStamp`, `PostText`, `UserID`) VALUES
(1, '2022-07-14 12:51:38', 'This is the first post on MyPost. Cool...', 40),
(2, '2022-07-14 12:55:15', 'Hey guys, how goes?', 39),
(3, '2022-07-14 12:56:55', 'Just putting it out there that I hate cats...', 41),
(4, '2022-07-14 13:09:13', 'Hello to the new people!', 40),
(5, '2022-07-14 13:20:01', 'Well thats brave...', 42),
(6, '2022-07-14 13:36:17', 'I forgot what I said now...', 41),
(7, '2022-07-14 17:35:20', 'Mac n Cheese for din! YUM!', 40),
(8, '2022-07-14 17:50:11', 'What yall having?', 40),
(9, '2022-07-14 18:01:22', 'We had pizza, but it had pineapple... Last time I let Mike order for us...', 39),
(10, '2022-07-14 18:40:32', 'sies man', 42),
(11, '2022-07-15 05:10:29', 'MORNING EVERYONE!', 39),
(12, '2022-07-15 06:09:00', 'yo lol', 42);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `FirstName` varchar(128) NOT NULL,
  `LastName` varchar(128) NOT NULL,
  `EmailAddress` varchar(128) NOT NULL,
  `Username` varchar(128) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`FirstName`, `LastName`, `EmailAddress`, `Username`, `Password`, `id`) VALUES
('Liam', 'Maeder', 'liam.maeder@gmail.com', 'Monarkle001', '$2y$10$g01Pz/9CXfTqFDDkg1l76.o5T6RT.qJjJitReNj5VoWHiUHHVInXa', 39),
('Allison', 'Bihrd', 'alli.b@gmail.com', 'The_Alley_Bee', '$2y$10$SAf641z6h5mGUOUOt6KX/O7HMlBkgE8zfgYlmiCMPM4m19WbrmEs.', 40),
('Simon', 'Kriel', 'simonkriel112@gmail.com', 'MrKriel15', '$2y$10$cEbGMh07VuoGv0rFYx2ZNu8jGKDEN0w55D1zRf0p1CP5q2pEzDRNC', 41),
('Nick', 'Maeder', 'nick.maeder@gmail.com', 'NoobMaster', '$2y$10$7ZAmkJCBtTJkn8x5dXJ3Y.ghoK4B2RB.uwpjvp4U7X4YLKP3Gn25e', 42),
('admin', 'user', 'adminUser@root.com', 'RootAdmin', '$2y$10$GYsmJgoGy0SD4WUcGBBaH.ZnzBDmF1XHnHpG31yW9Df/OYSfPCS/e', 43),
('Pier', 'Mandier', 'pierm@gmail.com', 'PierMan', '$2y$10$R7Vmqr6ADC9nmXP.7siG8ObcETWYsJgx2lNn2K/fjQrRnoKc3aH.u', 49),
('Liam', 'Maeder', 'email@gmail.com', 'Liamm', '$2y$10$Xp67iCQC3wsiW.EYOWZTd.Dp9z1lYUQjDMTQYLDIXkf4yUCpOA2W2', 50);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`PostID`),
  ADD UNIQUE KEY `PostID` (`PostID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Username_2` (`Username`),
  ADD KEY `FirstName` (`FirstName`),
  ADD KEY `LastName` (`LastName`),
  ADD KEY `EmailAddress` (`EmailAddress`),
  ADD KEY `Username` (`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Posts`
--
ALTER TABLE `Posts`
  MODIFY `PostID` bigint(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
