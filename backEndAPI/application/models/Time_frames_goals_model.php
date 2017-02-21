<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Time_frames_goals_model extends CI_Model
{

    public $table = 'time_frames_goals';
    public $id = 'id';
    public $order = 'DESC';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    // datatables
    function json() {
        $this->datatables->select('id,goal_id,time_frame_id');
        $this->datatables->from('time_frames_goals');
        //add this line for join
        //$this->datatables->join('table2', 'time_frames_goals.field = table2.field');
        $this->datatables->add_column('action', anchor(site_url('time_frames_goals/read/$1'),'Read')." | ".anchor(site_url('time_frames_goals/update/$1'),'Update')." | ".anchor(site_url('time_frames_goals/delete/$1'),'Delete','onclick="javasciprt: return confirm(\'Are You Sure ?\')"'), 'id');
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
        $this->db->like('id', $q);
	$this->db->or_like('goal_id', $q);
	$this->db->or_like('time_frame_id', $q);
	$this->db->from($this->table);
        return $this->db->count_all_results();
    }

    // get data with limit and search
    function get_limit_data($limit, $start = 0, $q = NULL) {
        $this->db->order_by($this->id, $this->order);
        $this->db->like('id', $q);
	$this->db->or_like('goal_id', $q);
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

}

