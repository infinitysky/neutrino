/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50634
Source Host           : 127.0.0.1:3306
Source Database       : okrs

Target Server Type    : MYSQL
Target Server Version : 50634
File Encoding         : 65001

Date: 2017-04-18 10:07:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for activities
-- ----------------------------
DROP TABLE IF EXISTS `activities`;
CREATE TABLE `activities` (
  `activity_id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `activity_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `activity_timestamp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `activity_group` varchar(255) DEFAULT NULL,
  `activity_group_id` int(11) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`activity_id`),
  KEY `fk_activities_users` (`user_id`),
  CONSTRAINT `fk_activities_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for company_infos
-- ----------------------------
DROP TABLE IF EXISTS `company_infos`;
CREATE TABLE `company_infos` (
  `company_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` text COLLATE utf8mb4_bin,
  `company_mission` text COLLATE utf8mb4_bin,
  `company_vision` text COLLATE utf8mb4_bin,
  `company_address` text COLLATE utf8mb4_bin,
  `company_phone` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `company_email` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`company_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for goals
-- ----------------------------
DROP TABLE IF EXISTS `goals`;
CREATE TABLE `goals` (
  `goal_id` int(11) NOT NULL AUTO_INCREMENT,
  `goal_name` text COLLATE utf8mb4_bin,
  `goal_description` text COLLATE utf8mb4_bin,
  `goal_status` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `time_frame_id` int(11) NOT NULL,
  `goal_unit` varchar(255) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `goal_progress_status` int(255) DEFAULT '0',
  `goal_target` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`goal_id`),
  KEY `goal_id` (`goal_id`),
  KEY `fk_goals_time_frame` (`time_frame_id`),
  CONSTRAINT `fk_goals_time_frame` FOREIGN KEY (`time_frame_id`) REFERENCES `time_frames` (`time_frame_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for goals_objectives
-- ----------------------------
DROP TABLE IF EXISTS `goals_objectives`;
CREATE TABLE `goals_objectives` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `goal_id` int(11) NOT NULL,
  `objective_id` int(11) NOT NULL,
  PRIMARY KEY (`record_id`),
  KEY `fk_goals_objectives_goals` (`goal_id`),
  KEY `fk_goals_objectives_objectivs` (`objective_id`),
  CONSTRAINT `fk_goals_objectives_goals` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`goal_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_goals_objectives_objectivs` FOREIGN KEY (`objective_id`) REFERENCES `objectives` (`objective_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for key_results
-- ----------------------------
DROP TABLE IF EXISTS `key_results`;
CREATE TABLE `key_results` (
  `result_id` int(11) NOT NULL AUTO_INCREMENT,
  `result_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `result_description` text COLLATE utf8mb4_bin,
  `result_unit` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `result_status` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `result_progress_status` int(255) DEFAULT '0',
  `result_target` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `objective_id` int(11) NOT NULL,
  PRIMARY KEY (`result_id`),
  KEY `fk_key_results_objectives` (`objective_id`),
  CONSTRAINT `fk_key_results_objectives` FOREIGN KEY (`objective_id`) REFERENCES `objectives` (`objective_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for objectives
-- ----------------------------
DROP TABLE IF EXISTS `objectives`;
CREATE TABLE `objectives` (
  `objective_id` int(11) NOT NULL AUTO_INCREMENT,
  `objective_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `objective_description` text COLLATE utf8mb4_bin,
  `objective_unit` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `objective_status` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `objective_progress_status` int(255) DEFAULT '0',
  `objective_target` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`objective_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for teams
-- ----------------------------
DROP TABLE IF EXISTS `teams`;
CREATE TABLE `teams` (
  `team_id` int(11) NOT NULL AUTO_INCREMENT,
  `team_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `team_description` text COLLATE utf8mb4_bin,
  `parent_team_id` int(11) unsigned DEFAULT NULL,
  `team_leader_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`team_id`),
  KEY `teams_users` (`team_leader_user_id`),
  CONSTRAINT `teams_users` FOREIGN KEY (`team_leader_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for teams_objectives
-- ----------------------------
DROP TABLE IF EXISTS `teams_objectives`;
CREATE TABLE `teams_objectives` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `objective_id` int(11) NOT NULL,
  PRIMARY KEY (`record_id`),
  KEY `fk_teams_objectives_teams` (`team_id`),
  KEY `fk_teams_objectives_objectives` (`objective_id`),
  CONSTRAINT `fk_teams_objectives_objectives` FOREIGN KEY (`objective_id`) REFERENCES `objectives` (`objective_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_teams_objectives_teams` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for teams_users
-- ----------------------------
DROP TABLE IF EXISTS `teams_users`;
CREATE TABLE `teams_users` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`record_id`),
  KEY `fk_teams_users_teams` (`team_id`),
  KEY `fk_teams_users_user` (`user_id`),
  CONSTRAINT `fk_teams_users_teams` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_teams_users_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=377 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for time_frames
-- ----------------------------
DROP TABLE IF EXISTS `time_frames`;
CREATE TABLE `time_frames` (
  `time_frame_id` int(11) NOT NULL AUTO_INCREMENT,
  `time_frame_description` text COLLATE utf8mb4_bin,
  `time_frame_start` date DEFAULT NULL,
  `time_frame_end` date DEFAULT NULL,
  PRIMARY KEY (`time_frame_id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

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
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

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
  `user_id` int(11) NOT NULL,
  `position` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_details_id`),
  KEY `fk_user_details_user` (`user_id`),
  KEY `fk_from_user_roles` (`role_id`),
  CONSTRAINT `fk_from_user_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fk_user_details_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for users_objectives
-- ----------------------------
DROP TABLE IF EXISTS `users_objectives`;
CREATE TABLE `users_objectives` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `objective_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`record_id`),
  KEY `fk_usersid_users` (`user_id`),
  KEY `fk_objectiveid_objectives` (`objective_id`),
  CONSTRAINT `fk_objectiveid_objectives` FOREIGN KEY (`objective_id`) REFERENCES `objectives` (`objective_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_usersid_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for user_setting
-- ----------------------------
DROP TABLE IF EXISTS `user_setting`;
CREATE TABLE `user_setting` (
  `setting_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `setting_default_time_frame_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`setting_id`),
  KEY `fk_user_setting_users` (`user_id`),
  CONSTRAINT `fk_user_setting_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
SET FOREIGN_KEY_CHECKS=1;
