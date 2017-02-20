/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50549
Source Host           : 127.0.0.1:3306
Source Database       : okrs

Target Server Type    : MYSQL
Target Server Version : 50549
File Encoding         : 65001

Date: 2017-02-20 18:15:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for activities
-- ----------------------------
DROP TABLE IF EXISTS `activities`;
CREATE TABLE `activities` (
  `activity_id` int(11) NOT NULL,
  `activity_detail` text COLLATE utf8mb4_bin,
  `activity_type` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `activity_timestamp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`activity_id`),
  KEY `fk_activities_users` (`user_id`),
  CONSTRAINT `fk_activities_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of activities
-- ----------------------------

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
  `time_frame_id` int(11) NOT NULL,
  PRIMARY KEY (`goal_id`,`time_frame_id`),
  KEY `fk_goals_time_frame` (`time_frame_id`),
  KEY `goal_id` (`goal_id`),
  CONSTRAINT `fk_goals_time_frame` FOREIGN KEY (`time_frame_id`) REFERENCES `time_frames` (`time_frame_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of goals
-- ----------------------------

-- ----------------------------
-- Table structure for goals_objectives
-- ----------------------------
DROP TABLE IF EXISTS `goals_objectives`;
CREATE TABLE `goals_objectives` (
  `record_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `objective_id` int(11) NOT NULL,
  PRIMARY KEY (`record_id`),
  KEY `fk_goals_objectives_goals` (`goal_id`),
  KEY `fk_goals_objectives_objectivs` (`objective_id`),
  CONSTRAINT `fk_goals_objectives_goals` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`goal_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_goals_objectives_objectivs` FOREIGN KEY (`objective_id`) REFERENCES `objectives` (`objective_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of goals_objectives
-- ----------------------------

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
  `objective_id` int(11) NOT NULL,
  PRIMARY KEY (`result_id`),
  KEY `fk_key_results_objectives` (`objective_id`),
  CONSTRAINT `fk_key_results_objectives` FOREIGN KEY (`objective_id`) REFERENCES `objectives` (`objective_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of key_results
-- ----------------------------

-- ----------------------------
-- Table structure for objectives
-- ----------------------------
DROP TABLE IF EXISTS `objectives`;
CREATE TABLE `objectives` (
  `objective_id` int(11) NOT NULL AUTO_INCREMENT,
  `objective_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `objective_description` text COLLATE utf8mb4_bin,
  PRIMARY KEY (`objective_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of objectives
-- ----------------------------
INSERT INTO `objectives` VALUES ('3', '3233', 0x3235353533);
INSERT INTO `objectives` VALUES ('4', 'hgfhfghf', null);
INSERT INTO `objectives` VALUES ('5', 'gfdgd', 0x6766);
INSERT INTO `objectives` VALUES ('6', 'fg', 0x7367);
INSERT INTO `objectives` VALUES ('7', 'dfg', null);
INSERT INTO `objectives` VALUES ('8', 'dfg', 0x67647366);
INSERT INTO `objectives` VALUES ('9', 'fg', null);
INSERT INTO `objectives` VALUES ('10', 'g', 0x64736667);
INSERT INTO `objectives` VALUES ('11', 'g', 0x66);
INSERT INTO `objectives` VALUES ('12', 'gdf', 0x7364);
INSERT INTO `objectives` VALUES ('13', 'df', 0x6473);
INSERT INTO `objectives` VALUES ('14', '54g', null);
INSERT INTO `objectives` VALUES ('15', 'g', 0x646667);
INSERT INTO `objectives` VALUES ('16', 'gdfg', 0x64);
INSERT INTO `objectives` VALUES ('17', '45gerg', 0x6466);
INSERT INTO `objectives` VALUES ('18', 'd', 0x7364);
INSERT INTO `objectives` VALUES ('19', 'gd', null);
INSERT INTO `objectives` VALUES ('20', 'gfds', 0x64667367);

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
  `team_description` text COLLATE utf8mb4_bin,
  `team_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `parent_team_id` int(11) unsigned DEFAULT NULL,
  `team_leader_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`team_id`),
  KEY `teams_users` (`team_leader_user_id`),
  CONSTRAINT `teams_users` FOREIGN KEY (`team_leader_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of teams
-- ----------------------------
INSERT INTO `teams` VALUES ('1', 0x31313233, '41d5', null, '4');
INSERT INTO `teams` VALUES ('3', 0x666464686668656B66, '234234223', null, '2');
INSERT INTO `teams` VALUES ('4', 0x333234647732666464686668656B66, '234234223', '1', '2');
INSERT INTO `teams` VALUES ('5', 0x353531313034, '234234223', '3', '2');
INSERT INTO `teams` VALUES ('6', 0x366635653166, '234234223', null, '2');
INSERT INTO `teams` VALUES ('7', 0x37373737, '234234223', null, '2');

-- ----------------------------
-- Table structure for teams_objectives
-- ----------------------------
DROP TABLE IF EXISTS `teams_objectives`;
CREATE TABLE `teams_objectives` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `objectives_id` int(11) NOT NULL,
  PRIMARY KEY (`record_id`),
  KEY `fk_teams_objectives_teams` (`team_id`),
  KEY `fk_teams_objectives_objectives` (`objectives_id`),
  CONSTRAINT `fk_teams_objectives_objectives` FOREIGN KEY (`objectives_id`) REFERENCES `objectives` (`objective_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_teams_objectives_teams` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of teams_objectives
-- ----------------------------

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
  CONSTRAINT `fk_teams_users_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_teams_users_teams` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of teams_users
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of time_frames
-- ----------------------------
INSERT INTO `time_frames` VALUES ('23', 0x36343536, '2017-02-26', '2017-03-11');
INSERT INTO `time_frames` VALUES ('26', 0x6E65776E65776E6577, '2017-03-03', '2017-03-23');
INSERT INTO `time_frames` VALUES ('32', 0x34333234333234, '2030-01-17', '2004-02-17');
INSERT INTO `time_frames` VALUES ('33', 0x373737383738363735, '2017-01-31', '2017-03-11');
INSERT INTO `time_frames` VALUES ('35', 0x6E65776E65776E65776E653277616464206E6577, '2017-01-31', '2017-02-17');
INSERT INTO `time_frames` VALUES ('36', 0x37373737, '2017-01-31', '2017-02-24');
INSERT INTO `time_frames` VALUES ('38', 0x3737373737, '2017-01-31', '2017-03-11');
INSERT INTO `time_frames` VALUES ('39', 0x34353366343335333435, '2017-01-31', '2017-02-24');
INSERT INTO `time_frames` VALUES ('40', 0x393939393939, '2017-02-01', '2017-03-10');
INSERT INTO `time_frames` VALUES ('41', 0x6E65773838, '2017-01-31', '2017-02-24');
INSERT INTO `time_frames` VALUES ('42', 0x3735363735363735, '2017-02-15', '2017-03-10');
INSERT INTO `time_frames` VALUES ('43', 0x3735363735363735, '2017-02-15', '2017-03-10');
INSERT INTO `time_frames` VALUES ('44', 0x373536373536373530303030, '2017-02-15', '2017-03-10');
INSERT INTO `time_frames` VALUES ('45', 0x32333432333432, '1970-01-01', '1970-01-01');
INSERT INTO `time_frames` VALUES ('49', 0x6D6F646974792D6E656F73683434353430373232, '2017-01-31', '2017-02-25');
INSERT INTO `time_frames` VALUES ('50', 0x343332343233343233, '2017-01-30', '2017-02-04');

-- ----------------------------
-- Table structure for time_frames_goals
-- ----------------------------
DROP TABLE IF EXISTS `time_frames_goals`;
CREATE TABLE `time_frames_goals` (
  `record_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  `time_frame_id` int(11) NOT NULL,
  PRIMARY KEY (`record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of time_frames_goals
-- ----------------------------

-- ----------------------------
-- Table structure for time_frames_objectives
-- ----------------------------
DROP TABLE IF EXISTS `time_frames_objectives`;
CREATE TABLE `time_frames_objectives` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `time_frame_id` int(11) NOT NULL,
  `objective_id` int(11) NOT NULL,
  PRIMARY KEY (`record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of time_frames_objectives
-- ----------------------------

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
  PRIMARY KEY (`user_details_id`),
  KEY `fk_user_details_user` (`user_id`),
  CONSTRAINT `fk_user_details_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of users_details
-- ----------------------------
INSERT INTO `users_details` VALUES ('1', 'Kiona', 'Jimenez', '1955-10-23', null, '1', null);
INSERT INTO `users_details` VALUES ('2', 'Elizabeth', 'Avery', '1953-12-13', null, '2', null);
INSERT INTO `users_details` VALUES ('3', null, null, '1969-04-03', null, '3', null);
INSERT INTO `users_details` VALUES ('4', 'Anika', 'Houston', '1971-03-02', null, '4', null);
INSERT INTO `users_details` VALUES ('5', 'Tyler', 'Hess', '1959-06-14', null, '5', null);
INSERT INTO `users_details` VALUES ('6', 'Dean', 'Marks', '1984-05-17', null, '6', null);
INSERT INTO `users_details` VALUES ('7', 'Christian', 'Mcfadden', '1996-02-04', null, '7', null);
INSERT INTO `users_details` VALUES ('8', 'Chadwick', 'Maxwell', '1968-03-05', null, '8', null);
INSERT INTO `users_details` VALUES ('9', 'Merritt', 'Morse', '1964-09-18', null, '9', null);
INSERT INTO `users_details` VALUES ('10', 'Marvin', 'Day', '1953-10-26', null, '10', null);
INSERT INTO `users_details` VALUES ('11', 'Lionel', 'Levine', '1935-04-17', null, '11', null);
INSERT INTO `users_details` VALUES ('12', 'Skyler', 'Garrett', '1953-10-26', null, '12', null);
INSERT INTO `users_details` VALUES ('13', 'Zena', 'Clayton', '1935-05-14', null, '13', null);
INSERT INTO `users_details` VALUES ('14', 'Yuri', 'Bowers', '1977-05-01', null, '14', null);
INSERT INTO `users_details` VALUES ('15', 'Daryl', 'Moon', '1981-01-31', null, '15', null);
INSERT INTO `users_details` VALUES ('16', 'Lane', 'Ruiz', '1976-02-16', null, '16', null);
INSERT INTO `users_details` VALUES ('17', 'Unity', 'Whitney', '1936-07-28', null, '17', null);
INSERT INTO `users_details` VALUES ('18', 'Wade', 'Russo', '1997-05-30', null, '18', null);
INSERT INTO `users_details` VALUES ('19', 'Breanna', 'Huber', '1944-04-18', null, '19', null);
INSERT INTO `users_details` VALUES ('20', 'Thomas', 'Reyes', '1996-07-08', null, '20', null);
INSERT INTO `users_details` VALUES ('21', 'Grace', 'Brady', '1967-12-23', null, '21', null);
INSERT INTO `users_details` VALUES ('22', 'Chandler', 'Caldwell', '1938-10-30', null, '22', null);
INSERT INTO `users_details` VALUES ('23', 'Kenneth', 'Clayton', '1950-05-28', null, '23', null);
INSERT INTO `users_details` VALUES ('24', 'Chantale', 'Myers', '1993-01-02', null, '24', null);
INSERT INTO `users_details` VALUES ('25', 'Giselle', 'Boyer', '1982-07-07', null, '25', null);
INSERT INTO `users_details` VALUES ('26', 'Catherine', 'Sexton', '1950-08-10', null, '26', null);
INSERT INTO `users_details` VALUES ('27', 'Tashya', 'Young', '1976-04-20', null, '27', null);
INSERT INTO `users_details` VALUES ('28', 'Claire', 'Jordan', '1992-04-06', null, '28', null);
INSERT INTO `users_details` VALUES ('29', 'Urielle', 'Huffman', '1945-08-31', null, '29', null);
INSERT INTO `users_details` VALUES ('30', 'Oprah', 'Floyd', '1945-10-22', null, '30', null);
INSERT INTO `users_details` VALUES ('31', 'Hyacinth', 'Sargent', '1995-09-17', null, '31', null);
INSERT INTO `users_details` VALUES ('32', 'Christopher', 'Whitney', '1962-03-21', null, '32', null);
INSERT INTO `users_details` VALUES ('33', 'Danielle', 'Lowery', '1985-12-15', null, '33', null);
INSERT INTO `users_details` VALUES ('34', 'Dominique', 'Thornton', '1941-05-31', null, '34', null);
INSERT INTO `users_details` VALUES ('35', 'Donna', 'Chandler', '1967-03-27', null, '35', null);
INSERT INTO `users_details` VALUES ('36', 'Gretchen', 'Duffy', '1948-10-26', null, '36', null);
INSERT INTO `users_details` VALUES ('37', 'Basil', 'Richard', '1948-04-20', null, '37', null);
INSERT INTO `users_details` VALUES ('38', 'Travis', 'Villarreal', '1984-05-30', null, '38', null);
INSERT INTO `users_details` VALUES ('39', 'Winter', 'Brooks', '1937-05-23', null, '39', null);
INSERT INTO `users_details` VALUES ('40', 'Geraldine', 'Burton', '1942-12-10', null, '40', null);
INSERT INTO `users_details` VALUES ('41', 'Paula', 'Richards', '1988-07-01', null, '41', null);
INSERT INTO `users_details` VALUES ('42', 'Darrel', 'Hinton', '1980-10-23', null, '42', null);
INSERT INTO `users_details` VALUES ('43', 'Quentin', 'Espinoza', '1960-12-29', null, '43', null);
INSERT INTO `users_details` VALUES ('44', 'Tate', 'Mckinney', '1975-10-15', null, '44', null);
INSERT INTO `users_details` VALUES ('45', 'Quamar', 'Booker', '1961-03-20', null, '45', null);
INSERT INTO `users_details` VALUES ('46', 'Nigel', 'Jefferson', '1958-01-22', null, '46', null);
INSERT INTO `users_details` VALUES ('47', 'Chaney', 'Leonard', '1964-02-22', null, '47', null);
INSERT INTO `users_details` VALUES ('48', 'Rachel', 'Wiley', '1968-02-05', null, '48', null);
INSERT INTO `users_details` VALUES ('49', 'Wing', 'Collins', '1945-11-02', null, '49', null);
INSERT INTO `users_details` VALUES ('50', 'Dawn', 'Wallace', '1947-11-11', null, '50', null);
INSERT INTO `users_details` VALUES ('51', 'Zephania', 'Hunt', '1981-12-16', null, '51', null);
INSERT INTO `users_details` VALUES ('52', 'Nigel', 'Mckinney', '1957-12-30', null, '52', null);
INSERT INTO `users_details` VALUES ('53', 'Iola', 'Roberts', '1938-03-24', null, '53', null);
INSERT INTO `users_details` VALUES ('54', 'Yetta', 'Albert', '1995-12-27', null, '54', null);
INSERT INTO `users_details` VALUES ('55', 'Amelia', 'Vasquez', '1998-04-15', null, '55', null);
INSERT INTO `users_details` VALUES ('56', 'Brock', 'Crawford', '1945-06-19', null, '56', null);
INSERT INTO `users_details` VALUES ('57', 'Jorden', 'Stephens', '1936-08-07', null, '57', null);
INSERT INTO `users_details` VALUES ('58', 'Lucius', 'Travis', '1984-10-31', null, '58', null);
INSERT INTO `users_details` VALUES ('59', 'Armand', 'Barron', '1960-06-07', null, '59', null);
INSERT INTO `users_details` VALUES ('60', 'Rahim', 'Estes', '1968-09-26', null, '60', null);
INSERT INTO `users_details` VALUES ('61', 'Harper', 'Lynn', '1947-08-28', null, '61', null);
INSERT INTO `users_details` VALUES ('62', 'Jillian', 'Mullen', '1988-07-15', null, '62', null);
INSERT INTO `users_details` VALUES ('63', 'Adam', 'Ramirez', '1990-04-11', null, '63', null);
INSERT INTO `users_details` VALUES ('64', 'Kylan', 'Reynolds', '1976-02-17', null, '64', null);
INSERT INTO `users_details` VALUES ('65', 'Gloria', 'Baxter', '1978-12-25', null, '65', null);
INSERT INTO `users_details` VALUES ('66', 'Madeline', 'Murphy', '1987-04-18', null, '66', null);
INSERT INTO `users_details` VALUES ('67', 'Yuli', 'Todd', '1997-09-22', null, '67', null);
INSERT INTO `users_details` VALUES ('68', 'Raymond', 'Lawson', '1993-07-03', null, '68', null);
INSERT INTO `users_details` VALUES ('69', 'Nayda', 'Mcpherson', '1938-12-07', null, '69', null);
INSERT INTO `users_details` VALUES ('70', 'Cheryl', 'Trujillo', '1988-04-30', null, '70', null);
INSERT INTO `users_details` VALUES ('71', 'Jakeem', 'Hines', '1987-06-03', null, '71', null);
INSERT INTO `users_details` VALUES ('72', 'Salvador', 'Coffey', '1976-01-02', null, '72', null);
INSERT INTO `users_details` VALUES ('73', 'Tad', 'Melendez', '1972-03-15', null, '73', null);
INSERT INTO `users_details` VALUES ('74', 'Sade', 'Hebert', '1979-07-04', null, '74', null);
INSERT INTO `users_details` VALUES ('75', 'Kieran', 'Bass', '1975-11-07', null, '75', null);
INSERT INTO `users_details` VALUES ('76', 'Lars', 'Castillo', '1987-02-08', null, '76', null);
INSERT INTO `users_details` VALUES ('77', 'August', 'Weiss', '1982-11-12', null, '77', null);
INSERT INTO `users_details` VALUES ('78', 'Vladimir', 'Reilly', '1992-06-25', null, '78', null);
INSERT INTO `users_details` VALUES ('79', 'Quamar', 'Lindsay', '1966-12-12', null, '79', null);
INSERT INTO `users_details` VALUES ('80', 'Troy', 'Hughes', '1992-01-05', null, '80', null);
INSERT INTO `users_details` VALUES ('81', 'Connor', 'Waller', '1985-11-19', null, '81', null);
INSERT INTO `users_details` VALUES ('82', 'Phyllis', 'Vincent', '1976-03-16', null, '82', null);
INSERT INTO `users_details` VALUES ('83', 'Maisie', 'Graves', '1990-05-13', null, '83', null);
INSERT INTO `users_details` VALUES ('84', 'Ima', 'Browning', '1979-09-01', null, '84', null);
INSERT INTO `users_details` VALUES ('85', 'Alexander', 'Nieves', '1954-04-12', null, '85', null);
INSERT INTO `users_details` VALUES ('86', 'Indigo', 'Hopper', '1985-01-01', null, '86', null);
INSERT INTO `users_details` VALUES ('87', 'Ali', 'Griffith', '1970-09-21', null, '87', null);
INSERT INTO `users_details` VALUES ('88', 'Geoffrey', 'Stone', '1957-10-01', null, '88', null);
INSERT INTO `users_details` VALUES ('89', 'Jaime', 'Cannon', '1936-05-05', null, '89', null);
INSERT INTO `users_details` VALUES ('90', 'Frances', 'Giles', '1968-09-25', null, '90', null);
INSERT INTO `users_details` VALUES ('91', 'Breanna', 'Livingston', '1943-09-04', null, '91', null);
INSERT INTO `users_details` VALUES ('92', 'Elaine', 'Parks', '1983-12-06', null, '92', null);
INSERT INTO `users_details` VALUES ('93', 'Yoko', 'Kirby', '1936-06-12', null, '93', null);
INSERT INTO `users_details` VALUES ('94', 'Odette', 'Day', '1939-10-28', null, '94', null);
INSERT INTO `users_details` VALUES ('95', 'Hollee', 'Sears', '1962-10-27', null, '95', null);
INSERT INTO `users_details` VALUES ('96', 'Lunea', 'Livingston', '1947-05-25', null, '96', null);
INSERT INTO `users_details` VALUES ('97', 'Thomas', 'Pace', '1969-12-16', null, '97', null);
INSERT INTO `users_details` VALUES ('98', 'Emi', 'Dyer', '1972-11-30', null, '98', null);
INSERT INTO `users_details` VALUES ('99', 'Yeo', 'Hardy', '1938-02-15', null, '99', null);
INSERT INTO `users_details` VALUES ('100', 'Aline', 'Greene', '1989-04-23', null, '100', null);

-- ----------------------------
-- Table structure for users_roles
-- ----------------------------
DROP TABLE IF EXISTS `users_roles`;
CREATE TABLE `users_roles` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`record_id`),
  KEY `fk_user_roles_user` (`user_id`),
  KEY `fk_user_roles_roles` (`role_id`),
  CONSTRAINT `fk_user_roles_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_roles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of users_roles
-- ----------------------------
SET FOREIGN_KEY_CHECKS=1;
