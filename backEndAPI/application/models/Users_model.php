<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Users_model extends CI_Model
{

    public $table = 'users';
    public $id = 'user_id';
    public $order = 'DESC';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    // datatables
    function json() {
        $this->datatables->select('user_id,email,username,password,account_status');
        $this->datatables->from('users');
        //add this line for join
        //$this->datatables->join('table2', 'users.field = table2.field');
        $this->datatables->add_column('action', anchor(site_url('users/read/$1'),'Read')." | ".anchor(site_url('users/update/$1'),'Update')." | ".anchor(site_url('users/delete/$1'),'Delete','onclick="javasciprt: return confirm(\'Are You Sure ?\')"'), 'user_id');
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

