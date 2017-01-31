/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50549
Source Host           : 127.0.0.1:3306
Source Database       : okrs

Target Server Type    : MYSQL
Target Server Version : 50549
File Encoding         : 65001

Date: 2017-01-30 13:36:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for activities
-- ----------------------------
DROP TABLE IF EXISTS `activities`;
CREATE TABLE `activities` (
  `activity_id` int(11) NOT NULL,
  `activity_detail` text COLLATE utf8mb4_bin,
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for activities_users
-- ----------------------------
DROP TABLE IF EXISTS `activities_users`;
CREATE TABLE `activities_users` (
  `id` int(11) NOT NULL,
  `activity_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for goals
-- ----------------------------
DROP TABLE IF EXISTS `goals`;
CREATE TABLE `goals` (
  `goal_id` int(11) NOT NULL AUTO_INCREMENT,
  `goal_description` text COLLATE utf8mb4_bin,
  PRIMARY KEY (`goal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for goals_objectives
-- ----------------------------
DROP TABLE IF EXISTS `goals_objectives`;
CREATE TABLE `goals_objectives` (
  `id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `objective_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_from_objectives` (`objective_id`),
  KEY `fk_from_goals` (`goal_id`),
  CONSTRAINT `fk_from_goal` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`goal_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_from_objectives` FOREIGN KEY (`objective_id`) REFERENCES `objectives` (`objective_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for key_results
-- ----------------------------
DROP TABLE IF EXISTS `key_results`;
CREATE TABLE `key_results` (
  `result_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text COLLATE utf8mb4_bin,
  PRIMARY KEY (`result_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for objectives
-- ----------------------------
DROP TABLE IF EXISTS `objectives`;
CREATE TABLE `objectives` (
  `objective_id` int(11) NOT NULL AUTO_INCREMENT,
  `objective_description` text COLLATE utf8mb4_bin,
  PRIMARY KEY (`objective_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for objectives_key_results
-- ----------------------------
DROP TABLE IF EXISTS `objectives_key_results`;
CREATE TABLE `objectives_key_results` (
  `id` int(11) NOT NULL,
  `objective_id` int(11) NOT NULL,
  `result_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_from_goals` (`objective_id`),
  KEY `fk_from_objectives` (`result_id`),
  CONSTRAINT `objectives_key_results_ibfk_1` FOREIGN KEY (`objective_id`) REFERENCES `objectives` (`objective_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `objectives_key_results_ibfk_2` FOREIGN KEY (`result_id`) REFERENCES `key_results` (`result_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for teams
-- ----------------------------
DROP TABLE IF EXISTS `teams`;
CREATE TABLE `teams` (
  `team_id` int(11) NOT NULL AUTO_INCREMENT,
  `team_description` text COLLATE utf8mb4_bin,
  `team_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for teams_users
-- ----------------------------
DROP TABLE IF EXISTS `teams_users`;
CREATE TABLE `teams_users` (
  `team_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `fk_from_teams` (`team_id`),
  KEY `fk_from_users_idx` (`user_id`),
  CONSTRAINT `fk_from_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_from_teams` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for time_frames
-- ----------------------------
DROP TABLE IF EXISTS `time_frames`;
CREATE TABLE `time_frames` (
  `time_freame_id` int(11) NOT NULL,
  `time_frame_description` text COLLATE utf8mb4_bin,
  `time_frame_start` date DEFAULT NULL,
  `time_frame_end` date DEFAULT NULL,
  PRIMARY KEY (`time_freame_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for time_frames_goals
-- ----------------------------
DROP TABLE IF EXISTS `time_frames_goals`;
CREATE TABLE `time_frames_goals` (
  `id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `time_frame_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_from_goals` (`goal_id`),
  KEY `fk_from_time_frame` (`time_frame_id`),
  CONSTRAINT `fk_from_time_frame` FOREIGN KEY (`time_frame_id`) REFERENCES `time_frames` (`time_freame_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_from_goals` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`goal_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for time_frames_objectives
-- ----------------------------
DROP TABLE IF EXISTS `time_frames_objectives`;
CREATE TABLE `time_frames_objectives` (
  `time_frame_id` int(11) NOT NULL,
  `objective_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `fk_from_golas` (`objective_id`),
  KEY `fk_from_time_frames` (`time_frame_id`),
  CONSTRAINT `time_frames_objectives_ibfk_2` FOREIGN KEY (`objective_id`) REFERENCES `objectives` (`objective_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `time_frames_objectives_ibfk_1` FOREIGN KEY (`time_frame_id`) REFERENCES `time_frames` (`time_freame_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `account_status` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for users_details
-- ----------------------------
DROP TABLE IF EXISTS `users_details`;
CREATE TABLE `users_details` (
  `user_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `mobile_number` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_details_id`),
  KEY `fp_from_user` (`user_id`),
  CONSTRAINT `fp_from_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for users_roles
-- ----------------------------
DROP TABLE IF EXISTS `users_roles`;
CREATE TABLE `users_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_from_users` (`user_id`),
  KEY `fk_from_roles` (`role_id`),
  CONSTRAINT `fk_from_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_from_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
SET FOREIGN_KEY_CHECKS=1;
