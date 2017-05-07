SELECT t.team_id, t.team_name, parents.team_name AS `Parent Team Name`, parents.team_id AS `Parent_id`
FROM teams AS t 
INNER JOIN  teams AS parents ON parents.team_id = t.parent_team_id
WHERE t.team_id =4;




-- get activites by goal id

SELECT
activities.*,
users_details.first_name,
users_details.last_name,
receiver_details.first_name AS receiver_first_name,
receiver_details.last_name AS receiver_last_name
FROM
activities
LEFT JOIN users ON activities.user_id = users.user_id
LEFT JOIN users_details ON users_details.user_id = users.user_id
LEFT JOIN users AS receiver ON activities.receiver_user_id = receiver.user_id
LEFT JOIN users_details AS receiver_details ON receiver_details.user_id = receiver.user_id
LEFT JOIN teams_users ON teams_users.user_id = users.user_id AND teams_users.user_id = receiver.user_id
LEFT JOIN teams ON teams.team_leader_user_id = users.user_id AND teams.team_leader_user_id = receiver.user_id AND teams_users.team_id = teams.team_id ,
goals_objectives

WHERE activities.activity_group='g' OR (activities.activity_group='g')

GROUP BY activities.activity_id
ORDER BY activities.activity_id DESC;

-- get activities by objective id

SELECT
activities.*,
users_details.first_name,
users_details.last_name,
receiver_details.first_name AS receiver_first_name,
receiver_details.last_name AS receiver_last_name
FROM
activities
LEFT JOIN users ON activities.user_id = users.user_id
LEFT JOIN users_details ON users_details.user_id = users.user_id
LEFT JOIN users AS receiver ON activities.receiver_user_id = receiver.user_id
LEFT JOIN users_details AS receiver_details ON receiver_details.user_id = receiver.user_id
LEFT JOIN teams_users ON teams_users.user_id = users.user_id AND teams_users.user_id = receiver.user_id
LEFT JOIN teams ON teams.team_leader_user_id = users.user_id AND teams.team_leader_user_id = receiver.user_id AND teams_users.team_id = teams.team_id ,
goals_objectives

WHERE activities.activity_group='o'

GROUP BY activities.activity_id
ORDER BY activities.activity_id DESC;



-- get activities by time Frame and team id
SELECT
activities.*,
users_details.first_name,
users_details.last_name,
receiver_details.first_name AS receiver_first_name,
receiver_details.last_name AS receiver_last_name
FROM
activities
LEFT JOIN users ON activities.user_id = users.user_id
LEFT JOIN users_details ON users_details.user_id = users.user_id
LEFT JOIN users AS receiver ON activities.receiver_user_id = receiver.user_id
LEFT JOIN users_details AS receiver_details ON receiver_details.user_id = receiver.user_id
LEFT JOIN teams_users ON teams_users.user_id = users.user_id AND teams_users.user_id = receiver.user_id
LEFT JOIN teams ON teams.team_leader_user_id = users.user_id AND teams.team_leader_user_id = receiver.user_id AND teams_users.team_id = teams.team_id

WHERE
(
DATE(activity_timestamp) BETWEEN 
(SELECT time_frames.time_frame_start FROM time_frames WHERE time_frames.time_frame_id = 64) 
AND 
(SELECT time_frames.time_frame_end FROM time_frames WHERE time_frames.time_frame_id = 64)
)
AND (
 teams.team_id = 19
)
GROUP BY activities.activity_id
ORDER BY activities.activity_id DESC;



-- get activities by user id and receiver_user_id
SELECT
activities.activity_id,
activities.activity_detail,
activities.activity_type,
activities.user_id,
activities.activity_timestamp,
activities.activity_group,
activities.activity_group_id,
activities.receiver_user_id,
users_details.first_name,
users_details.last_name,
receiver_details.first_name AS receiver_first_name,
receiver_details.last_name AS receiver_last_name
FROM activities

LEFT JOIN users ON activities.user_id = users.user_id
LEFT JOIN users_details ON users_details.user_id = users.user_id

LEFT JOIN users as receiver ON activities.receiver_user_id = receiver.user_id 
LEFT JOIN users_details as receiver_details ON receiver_details.user_id = receiver.user_id
WHERE activities.user_id = 105
OR activities.receiver_user_id = 105

GROUP BY activities.activity_id
ORDER BY activities.activity_id DESC;





-- get activities by user id and time Frame Id
SELECT
activities.*,
users_details.first_name,
users_details.last_name,
receiver_details.first_name AS receiver_first_name,
receiver_details.last_name AS receiver_last_name
FROM activities

LEFT JOIN users ON activities.user_id = users.user_id
LEFT JOIN users_details ON users_details.user_id = users.user_id

LEFT JOIN users as receiver ON activities.receiver_user_id = receiver.user_id 
LEFT JOIN users_details as receiver_details ON receiver_details.user_id = receiver.user_id

WHERE
(
DATE(activity_timestamp) BETWEEN 
(SELECT time_frames.time_frame_start FROM time_frames WHERE time_frames.time_frame_id = 64) 
AND 
(SELECT time_frames.time_frame_end FROM time_frames WHERE time_frames.time_frame_id = 64)
)
AND (
 activities.user_id = 1
OR activities.receiver_user_id = 1
)


GROUP BY activities.activity_id
ORDER BY activities.activity_id DESC;


-- get the activities in the time frame
SELECT
activities.*,
receiver_details.first_name AS receiver_first_name,
receiver_details.last_name AS receiver_last_name
FROM activities

LEFT JOIN users ON activities.user_id = users.user_id
LEFT JOIN users_details ON users_details.user_id = users.user_id

LEFT JOIN users as receiver ON activities.receiver_user_id = receiver.user_id 
LEFT JOIN users_details as receiver_details ON receiver_details.user_id = receiver.user_id

WHERE
(
DATE(activity_timestamp) BETWEEN 
(SELECT time_frames.time_frame_start FROM time_frames WHERE time_frames.time_frame_id = 63) 
AND 
(SELECT time_frames.time_frame_end FROM time_frames WHERE time_frames.time_frame_id = 63)
)

GROUP BY activities.activity_id
ORDER BY activities.activity_id DESC;






-- goal_with_objectives_and_team_leader_detials

SELECT
goals_objectives.record_id,
goals_objectives.goal_id,
goals_objectives.objective_id,
objectives.objective_id,
objectives.objective_name,
objectives.objective_description,
objectives.objective_unit,
objectives.objective_status,
objectives.objective_process_status,
teams.team_id,
teams.team_name,
teams.team_leader_user_id,
teams.team_description,
teams.parent_team_id,
users_details.user_details_id,
users_details.first_name,
users_details.last_name,
users_details.dob,
users_details.mobile_number,
users_details.user_id,
users_details.position,
goals.goal_id,
goals.goal_name,
goals.goal_description,
goals.goal_status,
goals.time_frame_id,
goals.goal_process_status,
goals.goal_unit,
time_frames.time_frame_id,
time_frames.time_frame_description,
time_frames.time_frame_start,
time_frames.time_frame_end
FROM goals_objectives 
LEFT JOIN goals ON goals_objectives.goal_id=goals.goal_id
LEFT JOIN objectives ON goals_objectives.objective_id=objectives.objective_id
LEFT JOIN time_frames on goals.time_frame_id=time_frames.time_frame_id
LEFT JOIN objectives_teams ON objectives.objective_id = objectives.objective_id
LEFT JOIN teams ON teams.team_id = objectives_teams.team_id
LEFT JOIN users_details ON users_details.user_id = teams.team_leader_user_id



-- Objectives_with_team_leader_info

SELECT
objectives.*,
teams.*,
users.user_id,
users.email,
users.account_status,
users_details.*
FROM
objectives
INNER JOIN teams_objectives ON teams_objectives.objective_id = objectives.objective_id
INNER JOIN teams ON teams_objectives.team_id = teams.team_id
INNER JOIN users ON teams.team_leader_user_id = users.user_id
INNER JOIN users_details ON users_details.user_id = users.user_id








