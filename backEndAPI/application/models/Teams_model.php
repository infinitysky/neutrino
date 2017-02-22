<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Teams_model extends CI_Model
{

    public $table = 'teams';
    public $id = 'team_id';
    public $order = 'ASC';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    // datatables
    function json() {
        $this->datatables->select('team_id,team_description,team_name');
        $this->datatables->from('teams');
        //add this line for join
        //$this->datatables->join('table2', 'teams.field = table2.field');
        $this->datatables->add_column('action', anchor(site_url('teams/read/$1'),'Read')." | ".anchor(site_url('teams/update/$1'),'Update')." | ".anchor(site_url('teams/delete/$1'),'Delete','onclick="javasciprt: return confirm(\'Are You Sure ?\')"'), 'team_id');
        return $this->datatables->generate();
    }

    // get all
    function get_all()
    {
        $this->db->order_by($this->id, $this->order);
        $this->db->select("teams.*, users_details.first_name, users_details.last_name");
        $this->db->from($this->table);
        $this->db->join("users_details","teams.team_leader_user_id = users_details.user_id",'left');

       // return $this->db->get($this->table)->result();
        return $this->db->get()->result();
    }

    // get data by id
    function get_by_id($id)
    {
        $this->db->where($this->id, $id);
        return $this->db->get($this->table)->row();
    }

    // get total rows
    function total_rows($q = NULL) {
        $this->db->like('team_id', $q);
        $this->db->or_like('team_description', $q);
        $this->db->or_like('team_name', $q);
        $this->db->or_like('parent_team_id', $q);
        $this->db->or_like('team_leader_id', $q);

        $this->db->from($this->table);
        return $this->db->count_all_results();
    }

    // get data with limit and search
    function get_limit_data($limit, $start = 0, $q = NULL) {
        $this->db->order_by($this->id, $this->order);
        $this->db->like('team_id', $q);
        $this->db->or_like('team_description', $q);
        $this->db->or_like('team_name', $q);
        $this->db->or_like('parent_team_id', $q);
        $this->db->or_like('team_leader_id', $q);
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
    function withParents($id)
    {
        $mysql='  SELECT t.team_id, t.team_name, parents.team_name AS `Parent Team Name`  FROM teams AS t INNER JOIN  teams AS parents ON parents.team_id = t.parent_team_id;';


    }

}

