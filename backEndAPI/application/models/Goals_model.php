<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Goals_model extends CI_Model
{

    public $table = 'goals';
    public $timeFrame_table = 'time_frames';
    public $user_details_table = 'users_details';
    public $teams_table = 'teams';
    public $teams_users_table = 'teams_users';
    public $teams_objectives_table = 'teams_objectives';
    public $id = 'goal_id';
    public $order = 'DESC';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    // datatables
    function json() {
        $this->datatables->select('goal_id,goal_description');
        $this->datatables->from('goals');
        //add this line for join
        //$this->datatables->join('table2', 'goals.field = table2.field');
        $this->datatables->add_column('action', anchor(site_url('goals/read/$1'),'Read')." | ".anchor(site_url('goals/update/$1'),'Update')." | ".anchor(site_url('goals/delete/$1'),'Delete','onclick="javasciprt: return confirm(\'Are You Sure ?\')"'), 'goal_id');
        return $this->datatables->generate();
    }

    // get all
    function get_all()
    {


        $this->db->trans_start();
        $this->db->select('*');
        $this->db->from($this->table);
        $this->db->join('time_frames',$this->table.'.time_frame_id=time_frames.time_frame_id','left');
        $this->db->order_by($this->id, $this->order);
        $queryResult=$this->db->get();


        return $queryResult->result();






    }

    // get data by id
    function get_by_id($id)
    {
        $this->db->where($this->id, $id);
        return $this->db->get($this->table)->row();
    } // get data by id


    // get total rows
    function total_rows($q = NULL) {
        $this->db->like('goal_id', $q);
        $this->db->or_like('goal_description', $q);
        $this->db->or_like('goal_name', $q);
        $this->db->or_like('time_frame_id', $q);



        $this->db->from($this->table);
        return $this->db->count_all_results();
    }

    // get data with limit and search
    function get_limit_data($limit, $start = 0, $q = NULL) {
        $this->db->order_by($this->id, $this->order);
        $this->db->like('goal_id', $q);
        $this->db->or_like('goal_description', $q);
        $this->db->or_like('goal_name', $q);
        $this->db->or_like('time_frame_id', $q);
        $this->db->limit($limit, $start);
        return $this->db->get($this->table)->result();
    }

    // insert data
    function insert($data)
    {
        $this->db->trans_start();
        $this->db->insert($this->table, $data);
        $insert_id=$this->db->insert_id();
        $this->db->trans_complete();
        return  $insert_id;
    }


    // update data
    function update($id, $data)
    {
        $this->db->trans_start();
        $this->db->where($this->id, $id);
        $this->db->update($this->table, $data);
        $affectedRowsNumber=$this->db->affected_rows();
        $this->db->trans_complete();
        return  $affectedRowsNumber;
    }

    // delete data
    function delete($id)
    {
        $this->db->trans_start();
        $this->db->where($this->id, $id);
        $this->db->delete($this->table);
        $affectedRowsNumber=$this->db->affected_rows();
        $this->db->trans_complete();
        return  $affectedRowsNumber;
    }


    function get_by_timeFrame_id($time_frame_id)
    {

        $this->db->trans_start();
        $this->db->select('*');
        $this->db->where($this->table.'.time_frame_id',$time_frame_id);
        $this->db->from($this->table);
        $this->db->join($this->timeFrame_table, $this->timeFrame_table.'.time_frame_id='.$this->table.'.time_frame_id');
        $result=$this->db->get();
        $this->db->trans_complete();


        return $result->result();
    }


    function get_by_user_id_timeFrame_id($user_id,$time_frame_id)
    {
        $mysqlQuery="SELECT
                    goals.*,
                    time_frames.*
                    FROM goals
                    INNER JOIN time_frames ON goals.time_frame_id = time_frames.time_frame_id
                    INNER JOIN goals_objectives ON goals_objectives.goal_id = goals.goal_id
                    INNER JOIN objectives ON goals_objectives.objective_id = objectives.objective_id
                    INNER JOIN teams_objectives ON teams_objectives.objective_id = objectives.objective_id ,
                    teams_users
                    INNER JOIN users ON teams_users.user_id = users.user_id
                    INNER JOIN users_details ON users_details.user_id = users.user_id
                    WHERE goals.time_frame_id = $time_frame_id AND
                    teams_users.user_id = $user_id
                    GROUP BY
                    goals.goal_id";

        $this->db->trans_start();

        $result=$this->db->query($mysqlQuery);
       // $result=$this->db->get();
        $this->db->trans_complete();


        return $result->result();
    }

}
