<?php

/**
 * Created by PhpStorm.
 * User: cliff
 * Date: 30/01/2017
 * Time: 14:15
 */
class Login_model extends CI_Model
{
    public $table = 'users';
    public $users_details_table = 'users_details';
    public $roles_table = 'roles';
    public $id = 'user_id';


    function __construct()
    {
        parent::__construct();
        $this->load->library('datatables');
        $this->load->database();

    }
    function usernameCheck($username){

        $tableName=$this->table;
        $this->db->select('username');
        $this->db->from($tableName);
        $this->db->where('username',$username);
       // $query = $this->db->get();
       // $myQuery=$this->db->get();
        $result=$this->db->count_all_results();
        return $result;


    }
    function emailCheck($email){

        $tableName=$this->table;
        $this->db->select('email');
        $this->db->from($tableName);
        $this->db->where('email',$email);
        // $query = $this->db->get();
        // $myQuery=$this->db->get();
        $result=$this->db->count_all_results();
        return $result;


    }
    function accountAuthCheck($authData){
        $tableName=$this->table;
        $this->db->select('email,password');
        $this->db->from($tableName);
        $this->db->where('email',$authData['email']);
        $this->db->where('password',$authData['password']);
        // $query = $this->db->get();
        // $myQuery=$this->db->get();
        $result=$this->db->count_all_results();
        return $result;

    }

    function getUserDetails($authData){
        $tableName=$this->table;
        $this->db->select('*');
        $this->db->from($tableName);
        $this->db->join($this->users_details_table,$tableName.'.user_id='.$this->users_details_table.'.user_id');
        $this->db->join($this->roles_table,$this->roles_table.'.role_id='.$this->users_details_table.'.role_id');
        $this->db->where('email',$authData['email']);
        $this->db->where('password',$authData['password']);
        $result = $this->db->get()->row();
        //$sql = $this->db->last_query();
        //echo $sql;
        return $result;


    }



}