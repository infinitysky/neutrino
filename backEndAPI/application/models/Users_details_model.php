<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Users_details_model extends CI_Model
{

    public $table = 'users_details';
    public $login_table = 'users';
    public $id = 'user_details_id';
    public $role_table='roles';
    public $user_id = 'user_id';
    public $order = 'ASC';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    // datatables
    function json() {
        $this->datatables->select('user_details_id,first_name,last_name,dob,mobile_number,user_id,roles.role');
        $this->datatables->from('users_details');

        //add this line for join
        //$this->datatables->join('table2', 'users_details.field = table2.field');
        $this->datatables->add_column('action', anchor(site_url('users_details/read/$1'),'Read')." | ".anchor(site_url('users_details/update/$1'),'Update')." | ".anchor(site_url('users_details/delete/$1'),'Delete','onclick="javasciprt: return confirm(\'Are You Sure ?\')"'), 'user_details_id');
        return $this->datatables->generate();
    }

    // get all
    function get_all()
    {
        $this->db->select('*');
        $this->db->from($this->table);

        $this->db->join('roles',$this->table.'.role_id='.$this->role_table.'.role_id','left');
        $this->db->order_by($this->id, $this->order);

        $result=$this->db->get()->result();
        return $result;
    }

    // get data by id
    function get_by_id($id)
    {
        $this->db->select('*');
        $this->db->from($this->table);
        $this->db->join('roles',$this->table.'.role_id='.$this->role_table.'.role_id','left');
        $this->db->where($this->id, $id);



        //echo $this->db->last_query();

        $result=$this->db->get()->row();
        return $result;
    }

    function getUserDetails_by_id($id)
    {
        $tableName = $this->table;
        $this->db->select('*');
        $this->db->from('users_details');
        $this->db->join('users', 'users.user_id=users_details.user_id');
        $this->db->where('users_details.'.$this->id, $id);
        $result = $this->db->get()->row();;
        //$sql = $this->db->last_query();
        //echo $sql;
        return $result;
    }





    function get_by_user_id($id)
    {
        $this->db->select('*');
        $this->db->from($this->table);
        $this->db->join('roles',$this->table.'.role_id='.$this->role_table.'.role_id','left');
        $this->db->where($this->user_id, $id);

        $result=$this->db->get()->row();

       // echo $this->db->last_query();

        return $result;
    }

    // get total rows
    function total_rows($q = NULL) {
        $this->db->like('user_details_id', $q);
        $this->db->or_like('first_name', $q);
        $this->db->or_like('last_name', $q);
        $this->db->or_like('dob', $q);
        $this->db->or_like('mobile_number', $q);
        $this->db->or_like('user_id', $q);
        $this->db->or_like('position', $q);
        $this->db->from($this->table);
        return $this->db->count_all_results();
    }

    // get data with limit and search
    function get_limit_data($limit, $start = 0, $q = NULL) {
        $this->db->order_by($this->id, $this->order);
        $this->db->like('user_details_id', $q);
        $this->db->or_like('first_name', $q);
        $this->db->or_like('last_name', $q);
        $this->db->or_like('dob', $q);
        $this->db->or_like('mobile_number', $q);
        $this->db->or_like('user_id', $q);
        $this->db->or_like('position', $q);
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

