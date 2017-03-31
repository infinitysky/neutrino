/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50634
Source Host           : 127.0.0.1:3306
Source Database       : okrs

Target Server Type    : MYSQL
Target Server Version : 50634
File Encoding         : 65001

Date: 2017-03-31 09:21:58
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
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of activities
-- ----------------------------
INSERT INTO `activities` VALUES ('105', 0x72727272, 'note', '1', '2017-03-29 09:17:08', null, null);
INSERT INTO `activities` VALUES ('106', 0x7070707070, 'note', '1', '2017-03-29 09:29:55', null, null);
INSERT INTO `activities` VALUES ('107', 0x64, 'note', '1', '2017-03-29 09:32:28', null, null);
INSERT INTO `activities` VALUES ('108', 0x383838, 'note', '1', '2017-03-29 09:36:14', null, null);
INSERT INTO `activities` VALUES ('109', 0x303030, 'note', '1', '2017-03-29 09:36:31', null, null);
INSERT INTO `activities` VALUES ('110', 0x20557064617465642061206E6577204B657920526573756C742050726F677265737320537461747573203A, 'Updated', '1', '2017-03-29 11:20:30', null, null);
INSERT INTO `activities` VALUES ('111', 0x20437265617465642061206E6577204F626A656374697665203A206164642074656D206F626A656374697665, 'Create', '1', '2017-03-29 14:34:36', null, null);
INSERT INTO `activities` VALUES ('112', 0x55706461746564204F626A656374697665203A206164642074656D206F626A65637469766520757064617465206C6F67203A20, 'Update', '1', '2017-03-29 14:34:43', null, null);
INSERT INTO `activities` VALUES ('113', 0x20437265617465642061206E6577204B657920526573756C74203A646464, 'Create', '1', '2017-03-29 14:34:47', null, null);
INSERT INTO `activities` VALUES ('114', 0x20557064617465642061206E6577204B657920526573756C742050726F677265737320537461747573203A, 'Updated', '1', '2017-03-29 14:34:56', null, null);
INSERT INTO `activities` VALUES ('115', 0x20557064617465642061206E6577204B657920526573756C742050726F677265737320537461747573203A, 'Updated', '1', '2017-03-29 14:35:48', null, null);
INSERT INTO `activities` VALUES ('116', 0x20557064617465642061206E6577204B657920526573756C742050726F677265737320537461747573203A, 'Updated', '1', '2017-03-29 14:35:58', null, null);

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
-- Records of company_infos
-- ----------------------------
INSERT INTO `company_infos` VALUES ('1', 0x526F636B20495420436C6F7564, 0x4566666F72746C65737320746563686E6F6C6F6779207468617420697320536F6C69642C2053696D706C652026205365637572650D0A4566666F72746C65737320746563686E6F6C6F6779207468617420697320536F6C69642C2053696D706C652026205365637572650D0A, 0x776572776572, 0x2036362D3638205361636B76696C6C652053747265657420436F6C6C696E67776F6F64205649432033303636204175737472616C6961, '+613 9415 6320', 'info@rockitcloud.com.au');

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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of goals
-- ----------------------------
INSERT INTO `goals` VALUES ('12', 0x496D70726F7665203230252073616C6573, 0x496D70726F7665203230252073616C6573, 'None', '63', '%', '0', '0');
INSERT INTO `goals` VALUES ('13', 0x496D70726F7665203235252073616C6573, 0x496D70726F7665203235252073616C6573, 'Warning', '63', '%', '0', null);
INSERT INTO `goals` VALUES ('14', 0x66696E6420323025206D6F726520637573746F6D6572, 0x66696E6420323025206D6F726520637573746F6D6572, 'Risk', '63', '%', '0', null);
INSERT INTO `goals` VALUES ('15', 0x636F6D65706C65746564205461736B, 0x636F6D65706C65746564205461736B, 'Complete', '63', '%', '0', null);

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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of goals_objectives
-- ----------------------------
INSERT INTO `goals_objectives` VALUES ('20', '13', '27');
INSERT INTO `goals_objectives` VALUES ('21', '14', '28');
INSERT INTO `goals_objectives` VALUES ('23', '13', '35');
INSERT INTO `goals_objectives` VALUES ('24', '14', '36');
INSERT INTO `goals_objectives` VALUES ('25', '13', '36');
INSERT INTO `goals_objectives` VALUES ('26', '12', '36');

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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of key_results
-- ----------------------------
INSERT INTO `key_results` VALUES ('12', '9999', 0x39393939, null, null, '0', null, '20');
INSERT INTO `key_results` VALUES ('15', 'KR1', 0x4B5231, '%', 'None', '24', '', '27');
INSERT INTO `key_results` VALUES ('17', 'kr3', 0x6B7233, '%', 'None', '88', '', '27');
INSERT INTO `key_results` VALUES ('18', 'K4', 0x4B34, '%', 'None', '30', '', '27');
INSERT INTO `key_results` VALUES ('22', 'New Key Result 1', 0x4E6577204B657920526573756C742031, '%', 'None', '38', '', '34');
INSERT INTO `key_results` VALUES ('23', 'h1', 0x6831, '%', 'None', '36', '', '34');
INSERT INTO `key_results` VALUES ('24', 'ffsdfsdfsdfsfawfefsdfsf4fase', 0x66736466736461667364666177666473, '%', 'None', '50', '', '34');
INSERT INTO `key_results` VALUES ('25', 'key result  1', 0x6B657920726573756C74202031, '%', 'None', '40', '', '35');
INSERT INTO `key_results` VALUES ('26', 'ddd', 0x646464, '%', 'None', '80', '', '36');

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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of objectives
-- ----------------------------
INSERT INTO `objectives` VALUES ('8', 'team 123 objective1', 0x7465616D20313233206F626A65637469766531, '%', 'None', '0', null);
INSERT INTO `objectives` VALUES ('19', ' f', 0x66, '%', 'None', '0', null);
INSERT INTO `objectives` VALUES ('20', 'fff', 0x666666, '%', 'None', '0', null);
INSERT INTO `objectives` VALUES ('27', 'find more customer111', 0x492066696E64206F6E6520676F6F64206578616D706C6531, '%', 'Warning', '0', '');
INSERT INTO `objectives` VALUES ('28', 'team 24', 0x7465616D203234, '%', 'None', '0', null);
INSERT INTO `objectives` VALUES ('29', 'Personal Objective 1', 0x506572736F6E616C204F626A6563746976652031, '%', 'None', '0', null);
INSERT INTO `objectives` VALUES ('30', 'Personal Objective 1', 0x506572736F6E616C204F626A6563746976652031, null, 'None', '0', null);
INSERT INTO `objectives` VALUES ('34', 'tt1', 0x74747431, '%', 'None', '0', '');
INSERT INTO `objectives` VALUES ('35', 'Objective test1', 0x4F626A656374697665207465737431, '%', 'None', '0', '');
INSERT INTO `objectives` VALUES ('36', 'add tem objective', 0x6164642074656D206F626A656374697665, '%', 'Risk', '0', '');

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
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', 'admin');
INSERT INTO `roles` VALUES ('2', 'manager');
INSERT INTO `roles` VALUES ('3', 'staff');

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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of teams
-- ----------------------------
INSERT INTO `teams` VALUES ('19', 'All Employees', 0x416C6C20456D706C6F796565732031, '0', '1');
INSERT INTO `teams` VALUES ('22', 'Team blue', 0x205465616D20426C7565, '0', '2');
INSERT INTO `teams` VALUES ('23', 'Team Red', 0x205465616D20546564, '0', '5');
INSERT INTO `teams` VALUES ('24', 'Team Yellow', 0x205465616D2059656C6C6F77, '0', '6');
INSERT INTO `teams` VALUES ('25', 'Sub-team of Yellow', 0x5375622D7465616D206F662059656C6C6F77, '24', '27');
INSERT INTO `teams` VALUES ('28', 'team 123', 0x7465616D20313233, '22', '2');

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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of teams_objectives
-- ----------------------------
INSERT INTO `teams_objectives` VALUES ('15', '28', '27');
INSERT INTO `teams_objectives` VALUES ('16', '24', '28');
INSERT INTO `teams_objectives` VALUES ('20', '28', '34');
INSERT INTO `teams_objectives` VALUES ('21', '28', '35');
INSERT INTO `teams_objectives` VALUES ('22', '28', '36');

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
) ENGINE=InnoDB AUTO_INCREMENT=271 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of teams_users
-- ----------------------------
INSERT INTO `teams_users` VALUES ('149', '19', '100');
INSERT INTO `teams_users` VALUES ('150', '19', '99');
INSERT INTO `teams_users` VALUES ('151', '19', '98');
INSERT INTO `teams_users` VALUES ('152', '19', '97');
INSERT INTO `teams_users` VALUES ('153', '19', '96');
INSERT INTO `teams_users` VALUES ('154', '19', '95');
INSERT INTO `teams_users` VALUES ('155', '19', '94');
INSERT INTO `teams_users` VALUES ('156', '19', '93');
INSERT INTO `teams_users` VALUES ('157', '19', '92');
INSERT INTO `teams_users` VALUES ('158', '19', '91');
INSERT INTO `teams_users` VALUES ('159', '19', '90');
INSERT INTO `teams_users` VALUES ('160', '19', '89');
INSERT INTO `teams_users` VALUES ('161', '19', '88');
INSERT INTO `teams_users` VALUES ('162', '19', '87');
INSERT INTO `teams_users` VALUES ('163', '19', '86');
INSERT INTO `teams_users` VALUES ('164', '19', '85');
INSERT INTO `teams_users` VALUES ('165', '19', '84');
INSERT INTO `teams_users` VALUES ('166', '19', '83');
INSERT INTO `teams_users` VALUES ('167', '19', '82');
INSERT INTO `teams_users` VALUES ('168', '19', '81');
INSERT INTO `teams_users` VALUES ('169', '19', '80');
INSERT INTO `teams_users` VALUES ('170', '19', '79');
INSERT INTO `teams_users` VALUES ('171', '19', '78');
INSERT INTO `teams_users` VALUES ('172', '19', '77');
INSERT INTO `teams_users` VALUES ('173', '19', '76');
INSERT INTO `teams_users` VALUES ('174', '19', '75');
INSERT INTO `teams_users` VALUES ('175', '19', '74');
INSERT INTO `teams_users` VALUES ('176', '19', '73');
INSERT INTO `teams_users` VALUES ('177', '19', '72');
INSERT INTO `teams_users` VALUES ('178', '19', '71');
INSERT INTO `teams_users` VALUES ('179', '19', '70');
INSERT INTO `teams_users` VALUES ('180', '19', '69');
INSERT INTO `teams_users` VALUES ('181', '19', '68');
INSERT INTO `teams_users` VALUES ('182', '19', '67');
INSERT INTO `teams_users` VALUES ('183', '19', '66');
INSERT INTO `teams_users` VALUES ('184', '19', '65');
INSERT INTO `teams_users` VALUES ('185', '19', '64');
INSERT INTO `teams_users` VALUES ('186', '19', '63');
INSERT INTO `teams_users` VALUES ('187', '19', '62');
INSERT INTO `teams_users` VALUES ('188', '19', '61');
INSERT INTO `teams_users` VALUES ('189', '19', '60');
INSERT INTO `teams_users` VALUES ('190', '19', '59');
INSERT INTO `teams_users` VALUES ('191', '19', '58');
INSERT INTO `teams_users` VALUES ('192', '19', '57');
INSERT INTO `teams_users` VALUES ('193', '19', '56');
INSERT INTO `teams_users` VALUES ('194', '19', '55');
INSERT INTO `teams_users` VALUES ('195', '19', '54');
INSERT INTO `teams_users` VALUES ('196', '19', '53');
INSERT INTO `teams_users` VALUES ('197', '19', '52');
INSERT INTO `teams_users` VALUES ('198', '19', '51');
INSERT INTO `teams_users` VALUES ('199', '19', '50');
INSERT INTO `teams_users` VALUES ('200', '19', '49');
INSERT INTO `teams_users` VALUES ('201', '19', '48');
INSERT INTO `teams_users` VALUES ('202', '19', '47');
INSERT INTO `teams_users` VALUES ('203', '19', '46');
INSERT INTO `teams_users` VALUES ('204', '19', '45');
INSERT INTO `teams_users` VALUES ('205', '19', '44');
INSERT INTO `teams_users` VALUES ('206', '19', '43');
INSERT INTO `teams_users` VALUES ('207', '19', '42');
INSERT INTO `teams_users` VALUES ('208', '19', '41');
INSERT INTO `teams_users` VALUES ('209', '19', '40');
INSERT INTO `teams_users` VALUES ('210', '19', '39');
INSERT INTO `teams_users` VALUES ('211', '19', '38');
INSERT INTO `teams_users` VALUES ('212', '19', '37');
INSERT INTO `teams_users` VALUES ('213', '19', '36');
INSERT INTO `teams_users` VALUES ('214', '19', '35');
INSERT INTO `teams_users` VALUES ('215', '19', '34');
INSERT INTO `teams_users` VALUES ('216', '19', '33');
INSERT INTO `teams_users` VALUES ('217', '19', '32');
INSERT INTO `teams_users` VALUES ('218', '19', '31');
INSERT INTO `teams_users` VALUES ('219', '19', '30');
INSERT INTO `teams_users` VALUES ('220', '19', '29');
INSERT INTO `teams_users` VALUES ('221', '19', '28');
INSERT INTO `teams_users` VALUES ('222', '19', '27');
INSERT INTO `teams_users` VALUES ('223', '19', '26');
INSERT INTO `teams_users` VALUES ('224', '19', '25');
INSERT INTO `teams_users` VALUES ('225', '19', '24');
INSERT INTO `teams_users` VALUES ('226', '19', '23');
INSERT INTO `teams_users` VALUES ('227', '19', '22');
INSERT INTO `teams_users` VALUES ('228', '19', '21');
INSERT INTO `teams_users` VALUES ('229', '19', '20');
INSERT INTO `teams_users` VALUES ('230', '19', '19');
INSERT INTO `teams_users` VALUES ('231', '19', '18');
INSERT INTO `teams_users` VALUES ('232', '19', '17');
INSERT INTO `teams_users` VALUES ('233', '19', '16');
INSERT INTO `teams_users` VALUES ('234', '19', '15');
INSERT INTO `teams_users` VALUES ('235', '19', '14');
INSERT INTO `teams_users` VALUES ('236', '19', '13');
INSERT INTO `teams_users` VALUES ('237', '19', '12');
INSERT INTO `teams_users` VALUES ('238', '19', '11');
INSERT INTO `teams_users` VALUES ('239', '19', '10');
INSERT INTO `teams_users` VALUES ('240', '19', '9');
INSERT INTO `teams_users` VALUES ('241', '19', '8');
INSERT INTO `teams_users` VALUES ('242', '19', '7');
INSERT INTO `teams_users` VALUES ('243', '19', '6');
INSERT INTO `teams_users` VALUES ('244', '19', '5');
INSERT INTO `teams_users` VALUES ('245', '19', '4');
INSERT INTO `teams_users` VALUES ('246', '19', '3');
INSERT INTO `teams_users` VALUES ('247', '19', '2');
INSERT INTO `teams_users` VALUES ('248', '19', '1');
INSERT INTO `teams_users` VALUES ('249', '22', '1');
INSERT INTO `teams_users` VALUES ('250', '22', '2');
INSERT INTO `teams_users` VALUES ('251', '22', '4');
INSERT INTO `teams_users` VALUES ('252', '22', '6');
INSERT INTO `teams_users` VALUES ('253', '23', '3');
INSERT INTO `teams_users` VALUES ('254', '23', '23');
INSERT INTO `teams_users` VALUES ('255', '23', '39');
INSERT INTO `teams_users` VALUES ('256', '23', '54');
INSERT INTO `teams_users` VALUES ('257', '23', '73');
INSERT INTO `teams_users` VALUES ('258', '24', '7');
INSERT INTO `teams_users` VALUES ('259', '24', '23');
INSERT INTO `teams_users` VALUES ('260', '24', '41');
INSERT INTO `teams_users` VALUES ('261', '25', '3');
INSERT INTO `teams_users` VALUES ('262', '25', '21');
INSERT INTO `teams_users` VALUES ('263', '25', '17');
INSERT INTO `teams_users` VALUES ('264', '25', '14');
INSERT INTO `teams_users` VALUES ('265', '25', '72');
INSERT INTO `teams_users` VALUES ('266', '25', '100');
INSERT INTO `teams_users` VALUES ('267', '28', '1');
INSERT INTO `teams_users` VALUES ('268', '28', '5');
INSERT INTO `teams_users` VALUES ('269', '28', '6');
INSERT INTO `teams_users` VALUES ('270', '28', '19');

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
-- Records of time_frames
-- ----------------------------
INSERT INTO `time_frames` VALUES ('63', 0x323031372C205131, '2017-01-01', '2017-04-01');
INSERT INTO `time_frames` VALUES ('64', 0x323031372C205132, '2017-04-01', '2017-07-01');
INSERT INTO `time_frames` VALUES ('65', 0x323031372C205133, '2017-07-01', '2017-10-01');
INSERT INTO `time_frames` VALUES ('66', 0x323031372C205134, '2017-10-01', '2018-01-01');
INSERT INTO `time_frames` VALUES ('67', 0x323031372C205131, '2017-01-01', '2017-03-31');
INSERT INTO `time_frames` VALUES ('68', 0x323031372C205132, '2017-04-01', '2017-06-30');
INSERT INTO `time_frames` VALUES ('69', 0x323031372C205133, '2017-07-01', '2017-09-30');
INSERT INTO `time_frames` VALUES ('70', 0x323031372C205134, '2017-10-01', '2017-12-31');
INSERT INTO `time_frames` VALUES ('71', 0x323031382C205131, '2018-01-01', '2018-03-31');
INSERT INTO `time_frames` VALUES ('72', 0x323031382C205132, '2018-04-01', '2018-06-30');
INSERT INTO `time_frames` VALUES ('73', 0x323031382C205133, '2018-07-01', '2018-09-30');
INSERT INTO `time_frames` VALUES ('74', 0x323031382C205134, '2018-10-01', '2018-12-31');
INSERT INTO `time_frames` VALUES ('75', 0x323031392C205131, '2019-01-01', '2019-03-31');
INSERT INTO `time_frames` VALUES ('76', 0x323031392C205132, '2019-04-01', '2019-06-30');
INSERT INTO `time_frames` VALUES ('77', 0x323031392C205133, '2019-07-01', '2019-09-30');
INSERT INTO `time_frames` VALUES ('78', 0x323031392C205134, '2019-10-01', '2019-12-31');
INSERT INTO `time_frames` VALUES ('79', 0x323032302C205131, '2020-01-01', '2020-03-31');
INSERT INTO `time_frames` VALUES ('80', 0x323032302C205132, '2020-04-01', '2020-06-30');
INSERT INTO `time_frames` VALUES ('81', 0x323032302C205133, '2020-07-01', '2020-09-30');
INSERT INTO `time_frames` VALUES ('82', 0x323032302C205134, '2020-10-01', '2020-12-31');
INSERT INTO `time_frames` VALUES ('83', 0x323032312C205131, '2021-01-01', '2021-03-31');
INSERT INTO `time_frames` VALUES ('84', 0x323032312C205132, '2021-04-01', '2021-06-30');
INSERT INTO `time_frames` VALUES ('85', 0x323032312C205133, '2021-07-01', '2021-09-30');
INSERT INTO `time_frames` VALUES ('86', 0x323032312C205134, '2021-10-01', '2021-12-31');
INSERT INTO `time_frames` VALUES ('87', 0x323032322C205131, '2022-01-01', '2022-03-31');
INSERT INTO `time_frames` VALUES ('88', 0x323032322C205132, '2022-04-01', '2022-06-30');
INSERT INTO `time_frames` VALUES ('89', 0x323032322C205133, '2022-07-01', '2022-09-30');
INSERT INTO `time_frames` VALUES ('90', 0x323032322C205134, '2022-10-01', '2022-12-31');
INSERT INTO `time_frames` VALUES ('91', 0x323032332C205131, '2023-01-01', '2023-03-31');
INSERT INTO `time_frames` VALUES ('92', 0x323032332C205132, '2023-04-01', '2023-06-30');
INSERT INTO `time_frames` VALUES ('93', 0x323032332C205133, '2023-07-01', '2023-09-30');
INSERT INTO `time_frames` VALUES ('94', 0x323032332C205134, '2023-10-01', '2023-12-31');
INSERT INTO `time_frames` VALUES ('95', 0x323032342C205131, '2024-01-01', '2024-03-31');
INSERT INTO `time_frames` VALUES ('96', 0x323032342C205132, '2024-04-01', '2024-06-30');
INSERT INTO `time_frames` VALUES ('97', 0x323032342C205133, '2024-07-01', '2024-09-30');
INSERT INTO `time_frames` VALUES ('98', 0x323032342C205134, '2024-10-01', '2024-12-31');
INSERT INTO `time_frames` VALUES ('99', 0x323032352C205131, '2025-01-01', '2025-03-31');
INSERT INTO `time_frames` VALUES ('100', 0x323032352C205132, '2025-04-01', '2025-06-30');
INSERT INTO `time_frames` VALUES ('101', 0x323032352C205133, '2025-07-01', '2025-09-30');
INSERT INTO `time_frames` VALUES ('102', 0x323032352C205134, '2025-10-01', '2025-12-31');
INSERT INTO `time_frames` VALUES ('103', 0x323032362C205131, '2026-01-01', '2026-03-31');
INSERT INTO `time_frames` VALUES ('104', 0x323032362C205132, '2026-04-01', '2026-06-30');
INSERT INTO `time_frames` VALUES ('105', 0x323032362C205133, '2026-07-01', '2026-09-30');
INSERT INTO `time_frames` VALUES ('106', 0x323032362C205134, '2026-10-01', '2026-12-31');
INSERT INTO `time_frames` VALUES ('107', 0x323032372C205131, '2027-01-01', '2027-03-31');
INSERT INTO `time_frames` VALUES ('108', 0x323032372C205132, '2027-04-01', '2027-06-30');
INSERT INTO `time_frames` VALUES ('109', 0x323032372C205133, '2027-07-01', '2027-09-30');
INSERT INTO `time_frames` VALUES ('110', 0x323032372C205134, '2027-10-01', '2027-12-31');
INSERT INTO `time_frames` VALUES ('111', 0x323032382C205131, '2028-01-01', '2028-03-31');
INSERT INTO `time_frames` VALUES ('112', 0x323032382C205132, '2028-04-01', '2028-06-30');
INSERT INTO `time_frames` VALUES ('113', 0x323032382C205133, '2028-07-01', '2028-09-30');
INSERT INTO `time_frames` VALUES ('114', 0x323032382C205134, '2028-10-01', '2028-12-31');
INSERT INTO `time_frames` VALUES ('115', 0x323032392C205131, '2029-01-01', '2029-03-31');
INSERT INTO `time_frames` VALUES ('116', 0x323032392C205132, '2029-04-01', '2029-06-30');
INSERT INTO `time_frames` VALUES ('117', 0x323032392C205133, '2029-07-01', '2029-09-30');
INSERT INTO `time_frames` VALUES ('118', 0x323032392C205134, '2029-10-01', '2029-12-31');
INSERT INTO `time_frames` VALUES ('119', 0x323033302C205131, '2030-01-01', '2030-03-31');
INSERT INTO `time_frames` VALUES ('120', 0x323033302C205132, '2030-04-01', '2030-06-30');
INSERT INTO `time_frames` VALUES ('121', 0x323033302C205133, '2030-07-01', '2030-09-30');
INSERT INTO `time_frames` VALUES ('122', 0x323033302C205134, '2030-10-01', '2030-12-31');

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
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin@admin.com', 'admin', '1234', '1');
INSERT INTO `users` VALUES ('2', 'manager@admin.com', 'manager', '1234', '1');
INSERT INTO `users` VALUES ('3', 'staff@admin.com', 'staff', '1234', '1');
INSERT INTO `users` VALUES ('4', 'director@admin.com', 'director', '1234', '1');
INSERT INTO `users` VALUES ('5', 'nisi.Aenean.eget@posuereenim.ca', 'Morse', '1234', '1');
INSERT INTO `users` VALUES ('6', 'massa@Maurisblanditenim.org', 'Roberts', '1234', '1');
INSERT INTO `users` VALUES ('7', 'orci.luctus@velsapien.co.uk', 'Hays', '1234', '0');
INSERT INTO `users` VALUES ('8', 'facilisis.vitae@Maecenas.net', 'Vaughn', '1234', '0');
INSERT INTO `users` VALUES ('9', 'mauris.ipsum@aliquet.net', 'Miranda', '1234', '1');
INSERT INTO `users` VALUES ('10', 'nec@justoeu.com', 'Finch', '1234', '0');
INSERT INTO `users` VALUES ('11', 'orci.in@mi.ca', 'Mercer', '1234', '1');
INSERT INTO `users` VALUES ('12', 'Ut.semper.pretium@ante.net', 'Roy', '1234', '0');
INSERT INTO `users` VALUES ('13', 'Nullam.vitae@augueSed.edu', 'Anthony', '1234', '1');
INSERT INTO `users` VALUES ('14', 'Integer.aliquam@aliquamadipiscinglacus.com', 'Mckee', '1234', '1');
INSERT INTO `users` VALUES ('15', 'fermentum@DonecnibhQuisque.net', 'Cooper', '1234', '1');
INSERT INTO `users` VALUES ('16', 'primis@acliberonec.com', 'Hall', '1234', '1');
INSERT INTO `users` VALUES ('17', 'Donec.tempus.lorem@pretiumaliquetmetus.net', 'Pate', '1234', '1');
INSERT INTO `users` VALUES ('18', 'Aliquam.ultrices@quis.com', 'Cote', '1234', '1');
INSERT INTO `users` VALUES ('19', 'sed@vitaealiquet.co.uk', 'Duran', '1234', '1');
INSERT INTO `users` VALUES ('20', 'aliquet@vitaeeratVivamus.net', 'Porter', '1234', '1');
INSERT INTO `users` VALUES ('21', 'mauris.a.nunc@penatibuset.ca', 'Washington', '1234', '0');
INSERT INTO `users` VALUES ('22', 'elit.Etiam.laoreet@fermentum.edu', 'Castro', '1234', '0');
INSERT INTO `users` VALUES ('23', 'et.libero@Nuncmauris.org', 'Mcintosh', '1234', '0');
INSERT INTO `users` VALUES ('24', 'iaculis.lacus@rutrumjustoPraesent.org', 'Cruz', '1234', '1');
INSERT INTO `users` VALUES ('25', 'Aliquam.rutrum.lorem@sociosquad.co.uk', 'Francis', '1234', '1');
INSERT INTO `users` VALUES ('26', 'augue.Sed.molestie@acrisusMorbi.com', 'Duran', '1234', '0');
INSERT INTO `users` VALUES ('27', 'sapien@consequatauctornunc.edu', 'Monroe', '1234', '0');
INSERT INTO `users` VALUES ('28', 'in@diam.co.uk', 'Hooper', '1234', '1');
INSERT INTO `users` VALUES ('29', 'eget.mollis.lectus@quam.net', 'Moran', '1234', '1');
INSERT INTO `users` VALUES ('30', 'Integer.mollis@inlobortistellus.org', 'Moreno', '1234', '0');
INSERT INTO `users` VALUES ('31', 'ipsum@nequeetnunc.net', 'Lindsay', '1234', '1');
INSERT INTO `users` VALUES ('32', 'convallis@amet.ca', 'Pratt', '1234', '1');
INSERT INTO `users` VALUES ('33', 'tempus.eu@inhendrerit.edu', 'Murphy', '1234', '1');
INSERT INTO `users` VALUES ('34', 'diam.eu.dolor@Cras.org', 'Arnold', '1234', '1');
INSERT INTO `users` VALUES ('35', 'diam@nonummy.net', 'Reeves', '1234', '0');
INSERT INTO `users` VALUES ('36', 'nec.luctus.felis@parturientmontes.org', 'West', '1234', '0');
INSERT INTO `users` VALUES ('37', 'Vivamus.nibh@mauris.com', 'Ruiz', '1234', '0');
INSERT INTO `users` VALUES ('38', 'mus.Donec@etnetus.co.uk', 'Mooney', '1234', '1');
INSERT INTO `users` VALUES ('39', 'nulla.Donec.non@ipsumSuspendisse.com', 'Mcmillan', '1234', '1');
INSERT INTO `users` VALUES ('40', 'eu.accumsan@nibhPhasellusnulla.ca', 'Holmes', '1234', '1');
INSERT INTO `users` VALUES ('41', 'erat.neque.non@etrisus.ca', 'Hester', '1234', '0');
INSERT INTO `users` VALUES ('42', 'libero.mauris@nequeet.com', 'Slater', '1234', '1');
INSERT INTO `users` VALUES ('43', 'amet.metus@malesuada.edu', 'Coffey', '1234', '0');
INSERT INTO `users` VALUES ('44', 'ac.turpis.egestas@sitametrisus.com', 'Hancock', '1234', '0');
INSERT INTO `users` VALUES ('45', 'torquent.per@Integertincidunt.co.uk', 'Hull', '1234', '1');
INSERT INTO `users` VALUES ('46', 'pellentesque@aliquet.org', 'Brady', '1234', '1');
INSERT INTO `users` VALUES ('47', 'ac.mattis.semper@Duis.ca', 'Harmon', '1234', '0');
INSERT INTO `users` VALUES ('48', 'venenatis.vel.faucibus@dapibus.org', 'Mosley', '1234', '0');
INSERT INTO `users` VALUES ('49', 'risus.odio@variuseteuismod.ca', 'Cardenas', '1234', '1');
INSERT INTO `users` VALUES ('50', 'nunc.nulla@sapienmolestieorci.org', 'Hamilton', '1234', '1');
INSERT INTO `users` VALUES ('51', 'ipsum@dapibusrutrumjusto.net', 'Whitley', '1234', '1');
INSERT INTO `users` VALUES ('52', 'justo.Praesent@arcuimperdiet.org', 'Jenkins', '1234', '1');
INSERT INTO `users` VALUES ('53', 'vel.faucibus.id@enimcondimentum.ca', 'Douglas', '1234', '0');
INSERT INTO `users` VALUES ('54', 'eleifend.egestas@conubianostraper.com', 'Hart', '1234', '0');
INSERT INTO `users` VALUES ('55', 'faucibus@Nam.org', 'Valencia', '1234', '0');
INSERT INTO `users` VALUES ('56', 'metus.Vivamus@convallis.edu', 'Nguyen', '1234', '0');
INSERT INTO `users` VALUES ('57', 'ac.orci@semperauctor.co.uk', 'Bowman', '1234', '0');
INSERT INTO `users` VALUES ('58', 'ipsum@posuere.ca', 'Wiggins', '1234', '1');
INSERT INTO `users` VALUES ('59', 'non.sollicitudin@lectusCum.ca', 'Strong', '1234', '0');
INSERT INTO `users` VALUES ('60', 'aliquet.nec@faucibus.com', 'Sosa', '1234', '0');
INSERT INTO `users` VALUES ('61', 'vitae.posuere.at@vestibulumloremsit.net', 'Whitley', '1234', '0');
INSERT INTO `users` VALUES ('62', 'In@egestasblanditNam.co.uk', 'Hicks', '1234', '0');
INSERT INTO `users` VALUES ('63', 'varius.orci@ipsumSuspendisse.edu', 'Gaines', '1234', '0');
INSERT INTO `users` VALUES ('64', 'aliquam@aodio.com', 'Henderson', '1234', '0');
INSERT INTO `users` VALUES ('65', 'neque.Nullam.ut@acturpisegestas.edu', 'Dale', '1234', '0');
INSERT INTO `users` VALUES ('66', 'vitae@turpis.co.uk', 'Nielsen', '1234', '0');
INSERT INTO `users` VALUES ('67', 'neque.sed.dictum@porttitorscelerisqueneque.com', 'Moody', '1234', '0');
INSERT INTO `users` VALUES ('68', 'pede@Phasellus.co.uk', 'Greer', '1234', '0');
INSERT INTO `users` VALUES ('69', 'vehicula.Pellentesque@utaliquam.ca', 'Wilkinson', '1234', '1');
INSERT INTO `users` VALUES ('70', 'a.ultricies.adipiscing@elitpretium.ca', 'Riddle', '1234', '1');
INSERT INTO `users` VALUES ('71', 'purus.accumsan@eueuismodac.co.uk', 'Sweet', '1234', '0');
INSERT INTO `users` VALUES ('72', 'turpis@eutellus.org', 'Obrien', '1234', '1');
INSERT INTO `users` VALUES ('73', 'ornare.In@egestasblandit.co.uk', 'Faulkner', '1234', '1');
INSERT INTO `users` VALUES ('74', 'Aenean@nasceturridiculusmus.org', 'Moran', '1234', '1');
INSERT INTO `users` VALUES ('75', 'et.malesuada@ornaresagittis.com', 'Dennis', '1234', '0');
INSERT INTO `users` VALUES ('76', 'erat.in.consectetuer@Fuscediamnunc.ca', 'Gregory', '1234', '0');
INSERT INTO `users` VALUES ('77', 'Proin.eget@arcueu.org', 'Kim', '1234', '1');
INSERT INTO `users` VALUES ('78', 'congue@acturpis.edu', 'Berry', '1234', '1');
INSERT INTO `users` VALUES ('79', 'odio.Aliquam@vulputatedui.com', 'Fitzpatrick', '1234', '0');
INSERT INTO `users` VALUES ('80', 'lorem@quislectusNullam.edu', 'Montgomery', '1234', '1');
INSERT INTO `users` VALUES ('81', 'pede.et.risus@nonsollicitudina.edu', 'Lee', '1234', '1');
INSERT INTO `users` VALUES ('82', 'Fusce.fermentum.fermentum@Nullaeu.co.uk', 'Gates', '1234', '1');
INSERT INTO `users` VALUES ('83', 'Mauris@odioEtiam.net', 'Mccormick', '1234', '0');
INSERT INTO `users` VALUES ('84', 'mollis.Phasellus.libero@nislelementum.net', 'Bond', '1234', '1');
INSERT INTO `users` VALUES ('85', 'auctor.velit.Aliquam@lobortisquis.com', 'Miranda', '1234', '0');
INSERT INTO `users` VALUES ('86', 'Praesent.interdum@convalliserateget.co.uk', 'Crosby', '1234', '0');
INSERT INTO `users` VALUES ('87', 'et.magnis.dis@libero.ca', 'Christian', '1234', '0');
INSERT INTO `users` VALUES ('88', 'facilisis.non@ultrices.net', 'Rocha', '1234', '0');
INSERT INTO `users` VALUES ('89', 'ipsum.Donec.sollicitudin@vulputate.com', 'Chavez', '1234', '1');
INSERT INTO `users` VALUES ('90', 'pede.Praesent.eu@Donec.com', 'Compton', '1234', '0');
INSERT INTO `users` VALUES ('91', 'euismod.urna@aptent.com', 'Alford', '1234', '1');
INSERT INTO `users` VALUES ('92', 'tincidunt@duiquisaccumsan.net', 'Sherman', '1234', '1');
INSERT INTO `users` VALUES ('93', 'dui@Proinmi.net', 'Randall', '1234', '0');
INSERT INTO `users` VALUES ('94', 'eu.metus.In@mollisvitae.edu', 'Pittman', '1234', '0');
INSERT INTO `users` VALUES ('95', 'hendrerit.consectetuer@sem.co.uk', 'Bray', '1234', '1');
INSERT INTO `users` VALUES ('96', 'lectus.sit.amet@sedsem.com', 'Miller', '1234', '0');
INSERT INTO `users` VALUES ('97', 'turpis.nec@odioNaminterdum.net', 'Mcleod', '1234', '0');
INSERT INTO `users` VALUES ('98', 'Praesent.eu.dui@arcu.ca', 'Bullock', '1234', '0');
INSERT INTO `users` VALUES ('99', 'natoque@egetmassa.com', 'Forbes', '1234', '0');
INSERT INTO `users` VALUES ('100', 'vel@Namligula.ca', 'Garrett', '1234', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of users_details
-- ----------------------------
INSERT INTO `users_details` VALUES ('1', 'Kiona', 'Jimenez', '1955-10-23', null, '1', '1', '1');
INSERT INTO `users_details` VALUES ('2', 'Elizabeth', 'Avery', '1953-12-13', null, '2', '1', '1');
INSERT INTO `users_details` VALUES ('3', null, null, '1969-04-03', null, '3', '1', '1');
INSERT INTO `users_details` VALUES ('4', 'Anika', 'Houston', '1971-03-02', null, '4', '2', '1');
INSERT INTO `users_details` VALUES ('5', 'Tyler', 'Hess', '1959-06-14', null, '5', '2', '2');
INSERT INTO `users_details` VALUES ('6', 'Dean', 'Marks', '1984-05-17', null, '6', '3', '2');
INSERT INTO `users_details` VALUES ('7', 'Christian', 'Mcfadden', '1996-02-04', null, '7', '3', '3');
INSERT INTO `users_details` VALUES ('8', 'Chadwick', 'Maxwell', '1968-03-05', null, '8', '3', '2');
INSERT INTO `users_details` VALUES ('9', 'Merritt', 'Morse', '1964-09-18', null, '9', '3', '2');
INSERT INTO `users_details` VALUES ('10', 'Marvin', 'Day', '1953-10-26', null, '10', '3', '2');
INSERT INTO `users_details` VALUES ('11', 'Lionel', 'Levine', '1935-04-17', null, '11', '3', '2');
INSERT INTO `users_details` VALUES ('12', 'Skyler', 'Garrett', '1953-10-26', null, '12', '3', '2');
INSERT INTO `users_details` VALUES ('13', 'Zena', 'Clayton', '1935-05-14', null, '13', '3', '3');
INSERT INTO `users_details` VALUES ('14', 'Yuri', 'Bowers', '1977-05-01', null, '14', '3', '3');
INSERT INTO `users_details` VALUES ('15', 'Daryl', 'Moon', '1981-01-31', null, '15', '3', '3');
INSERT INTO `users_details` VALUES ('16', 'Lane', 'Ruiz', '1976-02-16', null, '16', '3', '3');
INSERT INTO `users_details` VALUES ('17', 'Unity', 'Whitney', '1936-07-28', null, '17', '3', '3');
INSERT INTO `users_details` VALUES ('18', 'Wade', 'Russo', '1997-05-30', null, '18', '3', '3');
INSERT INTO `users_details` VALUES ('19', 'Breanna', 'Huber', '1944-04-18', null, '19', '3', '3');
INSERT INTO `users_details` VALUES ('20', 'Thomas', 'Reyes', '1996-07-08', null, '20', '3', '3');
INSERT INTO `users_details` VALUES ('21', 'Grace', 'Brady', '1967-12-23', null, '21', '3', '3');
INSERT INTO `users_details` VALUES ('22', 'Chandler', 'Caldwell', '1938-10-30', null, '22', '3', '3');
INSERT INTO `users_details` VALUES ('23', 'Kenneth', 'Clayton', '1950-05-28', null, '23', '3', '3');
INSERT INTO `users_details` VALUES ('24', 'Chantale', 'Myers', '1993-01-02', null, '24', '3', '3');
INSERT INTO `users_details` VALUES ('25', 'Giselle', 'Boyer', '1982-07-07', null, '25', '3', '3');
INSERT INTO `users_details` VALUES ('26', 'Catherine', 'Sexton', '1950-08-10', null, '26', '3', '3');
INSERT INTO `users_details` VALUES ('27', 'Tashya', 'Young', '1976-04-20', null, '27', '3', '3');
INSERT INTO `users_details` VALUES ('28', 'Claire', 'Jordan', '1992-04-06', null, '28', '3', '3');
INSERT INTO `users_details` VALUES ('29', 'Urielle', 'Huffman', '1945-08-31', null, '29', '3', '3');
INSERT INTO `users_details` VALUES ('30', 'Oprah', 'Floyd', '1945-10-22', null, '30', '3', '3');
INSERT INTO `users_details` VALUES ('31', 'Hyacinth', 'Sargent', '1995-09-17', null, '31', '3', '3');
INSERT INTO `users_details` VALUES ('32', 'Christopher', 'Whitney', '1962-03-21', null, '32', '3', '3');
INSERT INTO `users_details` VALUES ('33', 'Danielle', 'Lowery', '1985-12-15', null, '33', '3', '3');
INSERT INTO `users_details` VALUES ('34', 'Dominique', 'Thornton', '1941-05-31', null, '34', '3', null);
INSERT INTO `users_details` VALUES ('35', 'Donna', 'Chandler', '1967-03-27', null, '35', '3', '3');
INSERT INTO `users_details` VALUES ('36', 'Gretchen', 'Duffy', '1948-10-26', null, '36', '3', '3');
INSERT INTO `users_details` VALUES ('37', 'Basil', 'Richard', '1948-04-20', null, '37', '3', '3');
INSERT INTO `users_details` VALUES ('38', 'Travis', 'Villarreal', '1984-05-30', null, '38', '3', '3');
INSERT INTO `users_details` VALUES ('39', 'Winter', 'Brooks', '1937-05-23', null, '39', '3', '3');
INSERT INTO `users_details` VALUES ('40', 'Geraldine', 'Burton', '1942-12-10', null, '40', '3', '3');
INSERT INTO `users_details` VALUES ('41', 'Paula', 'Richards', '1988-07-01', null, '41', '3', '3');
INSERT INTO `users_details` VALUES ('42', 'Darrel', 'Hinton', '1980-10-23', null, '42', '3', '3');
INSERT INTO `users_details` VALUES ('43', 'Quentin', 'Espinoza', '1960-12-29', null, '43', '3', '3');
INSERT INTO `users_details` VALUES ('44', 'Tate', 'Mckinney', '1975-10-15', null, '44', '3', '3');
INSERT INTO `users_details` VALUES ('45', 'Quamar', 'Booker', '1961-03-20', null, '45', '3', '3');
INSERT INTO `users_details` VALUES ('46', 'Nigel', 'Jefferson', '1958-01-22', null, '46', '3', '3');
INSERT INTO `users_details` VALUES ('47', 'Chaney', 'Leonard', '1964-02-22', null, '47', '3', '3');
INSERT INTO `users_details` VALUES ('48', 'Rachel', 'Wiley', '1968-02-05', null, '48', '3', '3');
INSERT INTO `users_details` VALUES ('49', 'Wing', 'Collins', '1945-11-02', null, '49', '3', '3');
INSERT INTO `users_details` VALUES ('50', 'Dawn', 'Wallace', '1947-11-11', null, '50', '3', '3');
INSERT INTO `users_details` VALUES ('51', 'Zephania', 'Hunt', '1981-12-16', null, '51', '3', '3');
INSERT INTO `users_details` VALUES ('52', 'Nigel', 'Mckinney', '1957-12-30', null, '52', '3', '3');
INSERT INTO `users_details` VALUES ('53', 'Iola', 'Roberts', '1938-03-24', null, '53', '3', '3');
INSERT INTO `users_details` VALUES ('54', 'Yetta', 'Albert', '1995-12-27', null, '54', '3', '3');
INSERT INTO `users_details` VALUES ('55', 'Amelia', 'Vasquez', '1998-04-15', null, '55', '3', '3');
INSERT INTO `users_details` VALUES ('56', 'Brock', 'Crawford', '1945-06-19', null, '56', '3', '3');
INSERT INTO `users_details` VALUES ('57', 'Jorden', 'Stephens', '1936-08-07', null, '57', '3', '1');
INSERT INTO `users_details` VALUES ('58', 'Lucius', 'Travis', '1984-10-31', null, '58', '3', '2');
INSERT INTO `users_details` VALUES ('59', 'Armand', 'Barron', '1960-06-07', null, '59', '3', '2');
INSERT INTO `users_details` VALUES ('60', 'Rahim', 'Estes', '1968-09-26', null, '60', '3', '3');
INSERT INTO `users_details` VALUES ('61', 'Harper', 'Lynn', '1947-08-28', null, '61', '3', '2');
INSERT INTO `users_details` VALUES ('62', 'Jillian', 'Mullen', '1988-07-15', null, '62', '3', '1');
INSERT INTO `users_details` VALUES ('63', 'Adam', 'Ramirez', '1990-04-11', null, '63', '3', '1');
INSERT INTO `users_details` VALUES ('64', 'Kylan', 'Reynolds', '1976-02-17', null, '64', '3', '3');
INSERT INTO `users_details` VALUES ('65', 'Gloria', 'Baxter', '1978-12-25', null, '65', '3', '3');
INSERT INTO `users_details` VALUES ('66', 'Madeline', 'Murphy', '1987-04-18', null, '66', '3', '3');
INSERT INTO `users_details` VALUES ('67', 'Yuli', 'Todd', '1997-09-22', null, '67', '3', '3');
INSERT INTO `users_details` VALUES ('68', 'Raymond', 'Lawson', '1993-07-03', null, '68', '3', '3');
INSERT INTO `users_details` VALUES ('69', 'Nayda', 'Mcpherson', '1938-12-07', null, '69', '3', '3');
INSERT INTO `users_details` VALUES ('70', 'Cheryl', 'Trujillo', '1988-04-30', null, '70', '3', '3');
INSERT INTO `users_details` VALUES ('71', 'Jakeem', 'Hines', '1987-06-03', null, '71', '3', '3');
INSERT INTO `users_details` VALUES ('72', 'Salvador', 'Coffey', '1976-01-02', null, '72', '3', '3');
INSERT INTO `users_details` VALUES ('73', 'Tad', 'Melendez', '1972-03-15', null, '73', '3', '3');
INSERT INTO `users_details` VALUES ('74', 'Sade', 'Hebert', '1979-07-04', null, '74', '3', '3');
INSERT INTO `users_details` VALUES ('75', 'Kieran', 'Bass', '1975-11-07', null, '75', '3', '3');
INSERT INTO `users_details` VALUES ('76', 'Lars', 'Castillo', '1987-02-08', null, '76', '3', '3');
INSERT INTO `users_details` VALUES ('77', 'August', 'Weiss', '1982-11-12', null, '77', '3', '3');
INSERT INTO `users_details` VALUES ('78', 'Vladimir', 'Reilly', '1992-06-25', null, '78', '3', '3');
INSERT INTO `users_details` VALUES ('79', 'Quamar', 'Lindsay', '1966-12-12', null, '79', '3', '3');
INSERT INTO `users_details` VALUES ('80', 'Troy', 'Hughes', '1992-01-05', null, '80', '3', '3');
INSERT INTO `users_details` VALUES ('81', 'Connor', 'Waller', '1985-11-19', null, '81', '3', '3');
INSERT INTO `users_details` VALUES ('82', 'Phyllis', 'Vincent', '1976-03-16', null, '82', '3', '3');
INSERT INTO `users_details` VALUES ('83', 'Maisie', 'Graves', '1990-05-13', null, '83', '3', '3');
INSERT INTO `users_details` VALUES ('84', 'Ima', 'Browning', '1979-09-01', null, '84', '3', '3');
INSERT INTO `users_details` VALUES ('85', 'Alexander', 'Nieves', '1954-04-12', null, '85', '3', '3');
INSERT INTO `users_details` VALUES ('86', 'Indigo', 'Hopper', '1985-01-01', null, '86', '3', '3');
INSERT INTO `users_details` VALUES ('87', 'Ali', 'Griffith', '1970-09-21', null, '87', '3', '3');
INSERT INTO `users_details` VALUES ('88', 'Geoffrey', 'Stone', '1957-10-01', null, '88', '3', '3');
INSERT INTO `users_details` VALUES ('89', 'Jaime', 'Cannon', '1936-05-05', null, '89', '3', '3');
INSERT INTO `users_details` VALUES ('90', 'Frances', 'Giles', '1968-09-25', null, '90', '3', '3');
INSERT INTO `users_details` VALUES ('91', 'Breanna', 'Livingston', '1943-09-04', null, '91', '3', '3');
INSERT INTO `users_details` VALUES ('92', 'Elaine', 'Parks', '1983-12-06', null, '92', '3', '3');
INSERT INTO `users_details` VALUES ('93', 'Yoko', 'Kirby', '1936-06-12', null, '93', '3', '3');
INSERT INTO `users_details` VALUES ('94', 'Odette', 'Day', '1939-10-28', null, '94', '3', '3');
INSERT INTO `users_details` VALUES ('95', 'Hollee', 'Sears', '1962-10-27', null, '95', '3', '3');
INSERT INTO `users_details` VALUES ('96', 'Lunea', 'Livingston', '1947-05-25', null, '96', '3', '3');
INSERT INTO `users_details` VALUES ('97', 'Thomas', 'Pace', '1969-12-16', null, '97', '3', '3');
INSERT INTO `users_details` VALUES ('98', 'Emi', 'Dyer', '1972-11-30', null, '98', '3', '3');
INSERT INTO `users_details` VALUES ('99', 'Yeo', 'Hardy', '1938-02-15', null, '99', '3', '3');
INSERT INTO `users_details` VALUES ('100', 'Aline', 'Greene', '1989-04-23', null, '100', '3', '3');

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
-- Records of users_objectives
-- ----------------------------
INSERT INTO `users_objectives` VALUES ('1', '30', '1');

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

-- ----------------------------
-- Records of user_setting
-- ----------------------------
SET FOREIGN_KEY_CHECKS=1;
