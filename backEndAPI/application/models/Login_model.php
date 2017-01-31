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
        $this->db->join('users_details',$tableName.'.user_id=users_details.user_id');
        $this->db->where('email',$authData['email']);
        $this->db->where('password',$authData['password']);
        $result = $this->db->get()->result_array();;
        //$sql = $this->db->last_query();
        //echo $sql;
        return $result;


    }



}