<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Objectives_model extends CI_Model
{

    public $table = 'objectives';
    public $id = 'objective_id';
    public $order = 'DESC';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    // datatables
    function json() {
        $this->datatables->select('objective_id,objective_description');
        $this->datatables->from('objectives');
        //add this line for join
        //$this->datatables->join('table2', 'objectives.field = table2.field');
        $this->datatables->add_column('action', anchor(site_url('objectives/read/$1'),'Read')." | ".anchor(site_url('objectives/update/$1'),'Update')." | ".anchor(site_url('objectives/delete/$1'),'Delete','onclick="javasciprt: return confirm(\'Are You Sure ?\')"'), 'objective_id');
        return $this->datatables->generate();
    }

    // get all
    function get_all()
    {
        $this->db->order_by($this->id, $this->order);
        return $this->db->get($this->table)->result();
    }

    // get data by id
    function get_by_id($id)
    {
        $this->db->where($this->id, $id);
        return $this->db->get($this->table)->row();
    }
    
    // get total rows
    function total_rows($q = NULL) {
        $this->db->like('objective_id', $q);
	    $this->db->or_like('objective_description', $q);
        $this->db->or_like('objective_name', $q);


	$this->db->from($this->table);
        return $this->db->count_all_results();
    }

    // get data with limit and search
    function get_limit_data($limit, $start = 0, $q = NULL) {
        $this->db->order_by($this->id, $this->order);
        $this->db->like('objective_id', $q);
	    $this->db->or_like('objective_description', $q);
        $this->db->or_like('objective_name', $q);
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

    function get_key_results_by_objective_id($objective_id){

        $this->db->like('objective_id', $q);
        $this->db->or_like('objective_description', $q);
        $this->db->or_like('objective_name', $q);

    }

    function get_objectives_by_user_id_timeFrame_id($user_id,$timeFrame_id){

        $mysqlQuery="SELECT objectives.*, teams.*
        FROM objectives
        INNER JOIN teams_objectives ON teams_objectives.objective_id = objectives.objective_id
        INNER JOIN teams ON teams_objectives.team_id = teams.team_id
        INNER JOIN teams_users ON teams_users.team_id = teams.team_id
        INNER JOIN users ON teams.team_leader_user_id = users.user_id AND teams_users.user_id = users.user_id
        INNER JOIN goals_objectives ON goals_objectives.objective_id = objectives.objective_id
        INNER JOIN goals ON goals_objectives.goal_id = goals.goal_id
        Where teams_users.user_id = $user_id AND goals.time_frame_id=$timeFrame_id
        GROUP BY objectives.objective_id";


        $this->db->trans_start();
        $result=$this->db->query($mysqlQuery);
        $this->db->trans_complete();


        return $result->result();

    }

}

