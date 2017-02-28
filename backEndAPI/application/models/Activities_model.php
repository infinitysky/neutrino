<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Activities_model extends CI_Model
{

    public $table = 'activities';
    public $id = 'activity_id';
    public $order = 'DESC';
    public $orderByDate = 'activity_timestamp';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    // datatables
    function json() {
        $this->datatables->select('activity_id,activity_detail');
        $this->datatables->from('activities');
        //add this line for join
        //$this->datatables->join('table2', 'activities.field = table2.field');
        $this->datatables->add_column('action', anchor(site_url('activities/read/$1'),'Read')." | ".anchor(site_url('activities/update/$1'),'Update')." | ".anchor(site_url('activities/delete/$1'),'Delete','onclick="javasciprt: return confirm(\'Are You Sure ?\')"'), 'activity_id');
        return $this->datatables->generate();
    }

    // get all
    function get_all()
    {
        $this->db->trans_start();
        $this->db->order_by($this->orderByDate, $this->order);
        $this->db->select("*");
        $this->db->from($this->table);
        $this->db->join("users_details",$this->table.".user_id = users_details.user_id",'left');

        $result=$this->db->get();
        $this->db->trans_complete();


        return  $result->result();

    }

    // get data by id
    function get_by_id($id)
    {
        $this->db->where($this->id, $id);
        return $this->db->get($this->table)->row();
    }


    // get total rows
    function total_rows($q = NULL) {
        $this->db->like('activity_id', $q);
        $this->db->or_like('activity_detail', $q);
        $this->db->or_like('activity_type', $q);
        $this->db->or_like('user_id', $q);
        $this->db->or_like('activity_timestamp', $q);
        $this->db->from($this->table);
        return $this->db->count_all_results();
    }

    // get data with limit and search
    function get_limit_data($limit, $start = 0, $q = NULL) {
        $this->db->order_by($this->id, $this->order);
        $this->db->like('activity_id', $q);
        $this->db->or_like('activity_detail', $q);
        $this->db->or_like('activity_type', $q);
        $this->db->or_like('user_id', $q);
        $this->db->or_like('activity_timestamp', $q);



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
    function get_by_user_id($userId){
        $this->db->trans_start();
        $this->db->order_by($this->orderByDate, $this->order);
        $this->db->select("*");
        $this->db->from($this->table);
        $this->db->join("users_details",$this->table.".user_id = users_details.user_id",'left');
        $this->db->where($this->table.'.user_id',$userId);
        $result=$this->db->get();
        $this->db->trans_complete();
        return  $result->result();
    }

    function get_by_team_id($team_Id){
        $this->db->trans_start();
        $this->db->order_by($this->orderByDate, $this->order);
        $this->db->select("*");
        $this->db->from($this->table);

        $this->db->join("teams_users",$this->table.".user_id = teams_users.user_id",'left');

        $this->db->join("users_details",$this->table.".user_id = users_details.user_id",'left');
        $this->db->where('teams_users.team_id',$team_Id);
        $result=$this->db->get();
        $this->db->trans_complete();
        return  $result->result();
    }



}
