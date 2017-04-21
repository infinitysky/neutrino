<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Users_model extends CI_Model
{

    public $table = 'users';
    public $user_Details_table = 'users_details';
    public $role_table = 'roles';
    public $id = 'user_id';
    public $order = 'DESC';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }



    // get all
    function get_all()
    {
        $this->db->trans_begin();
        $this->db->select('*');
        $this->db->from($this->table);
        $this->db->join($this->user_Details_table,$this->table.'.user_id='.$this->user_Details_table.'.user_id','left');
        $this->db->join($this->role_table,$this->user_Details_table.'.role_id='.$this->role_table.'.role_id','left');
        $this->db->order_by($this->table.'.'.$this->id, $this->order);
        $result=$this->db->get();
        $this->db->trans_complete();
        return $result->result();
    }

    // get data by id
    function get_by_id($id)
    {
        $this->db->trans_begin();
        $this->db->select('*');
        $this->db->from($this->table);
        $this->db->where($this->table.'.'.$this->id, $id);
        $this->db->join($this->user_Details_table,$this->table.'.user_id='.$this->user_Details_table.'.user_id','left');
        $this->db->join($this->role_table,$this->user_Details_table.'.role_id='.$this->role_table.'.role_id','left');
        $this->db->order_by($this->table.'.'.$this->id, $this->order);
        $result=$this->db->get();
        $this->db->trans_complete();
        return $result->row();

    }

    // get total rows
    function total_rows($q = NULL) {
        $this->db->like('user_id', $q);
        $this->db->or_like('email', $q);
        $this->db->or_like('username', $q);
        $this->db->or_like('password', $q);
        $this->db->or_like('account_status', $q);
        $this->db->from($this->table);
        return $this->db->count_all_results();
    }

    // get data with limit and search
    function get_limit_data($limit, $start = 0, $q = NULL) {
        $this->db->order_by($this->id, $this->order);
        $this->db->like('user_id', $q);
        $this->db->or_like('email', $q);
        $this->db->or_like('username', $q);
        $this->db->or_like('password', $q);
        $this->db->or_like('account_status', $q);
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
        $this->db->where($this->id, $id);
        $this->db->update($this->table, $data);
    }

    // delete data
    function delete($id)
    {
        $this->db->where($this->id, $id);
        $this->db->delete($this->table);
        return  $this->db->affected_rows();
    }
    function getUserDetails($authData){
        $tableName=$this->table;
        $this->db->select('*');
        $this->db->from($tableName);
        $this->db->join('users_details',$tableName.'.user_id=users_details.user_id');
        $this->db->where('email',$authData['email']);
        $this->db->where('password',$authData['password']);
        $result = $this->db->get()->result_array();;
        //$sql = $this->db->last_query();
        //echo $sql;
        return $result;


    }

}

