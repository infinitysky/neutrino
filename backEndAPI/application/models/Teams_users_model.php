<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Teams_users_model extends CI_Model
{

    public $table = 'teams_users';
    public $id = 'record_id';
    public $order = 'DESC';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    // datatables
    function json() {
        $this->datatables->select('team_id,user_id,record_id');
        $this->datatables->from('teams_users');
        //add this line for join
        //$this->datatables->join('table2', 'teams_users.field = table2.field');
        $this->datatables->add_column('action', anchor(site_url('teams_users/read/$1'),'Read')." | ".anchor(site_url('teams_users/update/$1'),'Update')." | ".anchor(site_url('teams_users/delete/$1'),'Delete','onclick="javasciprt: return confirm(\'Are You Sure ?\')"'), 'id');
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
        $this->db->like('record_id', $q);
        $this->db->or_like('team_id', $q);
        $this->db->or_like('user_id', $q);
        $this->db->from($this->table);
        return $this->db->count_all_results();
    }

    // get data with limit and search
    function get_limit_data($limit, $start = 0, $q = NULL) {
        $this->db->order_by($this->id, $this->order);
        $this->db->like('record_id', $q);
        $this->db->or_like('team_id', $q);
        $this->db->or_like('user_id', $q);
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

    function batch_insert($data)
    {
        $this->db->trans_start();
        $query=$this->db->insert_batch($this->table, $data);
       // $query=$this->db->insert_id();
        $this->db->trans_complete();
        return $query;

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


    // delete data
    function delete_by_user_id_team_id($userId,$teamId)
    {

        $this->db->trans_start();

        $this->db->where('user_id', $userId);
        $this->db->where('team_id', $teamId);

        $this->db->delete($this->table);
        $affectedRowsNumber=$this->db->affected_rows();
        $this->db->trans_complete();
        return $affectedRowsNumber;

    }


    //The idea is comes from DELETE FROM `teams_users` WHERE `teams_users`.`team_id`=3 AND `teams_users`.`user_id` IN (87,88,89)
    function batch_delete_by_user_id($userId,$teamIdDataArray)
    {
        $this->db->trans_start();

        $this->db->where('user_id', $userId);
        $this->db->where_in('team_id', $teamIdDataArray);

        $this->db->delete($this->table);
        $affectedRowsNumber=$this->db->affected_rows();
        $this->db->trans_complete();
        return $affectedRowsNumber;

    }



    //delete data
    function batch_delete_by_team_id($teamId,$userIdDataArray)
    {
        //DELETE FROM `teams_users` WHERE `team_id` = '19' AND `user_id` IN(0, '100', '99', '76'))

        $this->db->trans_start();
        $this->db->where('team_id', $teamId);
        $this->db->where_in('user_id', $userIdDataArray);
        $this->db->delete($this->table);
        $affectedRowsNumber=$this->db->affected_rows();
        $this->db->trans_complete();

     //   echo $this->db->last_query();
        return $affectedRowsNumber;

    }

    function delete_all_by_user_id($userId)
    {
        $this->db->trans_start();


        $this->db->where_in('team_id', $userId);

        $this->db->delete($this->table);
        $affectedRowsNumber=$this->db->affected_rows();
        $this->db->trans_complete();
        return $affectedRowsNumber;

    }

    function delete_all_by_team_id($team_id)
    {
        $this->db->trans_start();


        $this->db->where_in('team_id', $team_id);

        $this->db->delete($this->table);
        $affectedRowsNumber=$this->db->affected_rows();
        $this->db->trans_complete();
        return $affectedRowsNumber;

    }



    function get_by_user_id($user_id){
        $this->db->trans_start();
        $this->db->order_by($this->id, $this->order);
        $this->db->select('*');
        $this->db->from($this->table);
        $this->db->where('teams_users.user_id',$user_id);
        $this->db->join('teams', 'teams.team_id=teams_users.team_id','left');
        $this->db->join('users_details', 'users_details.user_id=teams_users.user_id','left');
        $this->db->join('users', 'users.user_id=users_details.user_id','left');
        $queryResult=$this->db->get();
        $this->db->trans_complete();
        //echo $this->db->last_query();
        return $queryResult->result();

    }
    function get_by_team_id($team_id){

        $this->db->trans_start();
        $this->db->order_by($this->id, $this->order);
        $this->db->select('*');
        $this->db->from($this->table);
        $this->db->where('teams_users.team_id',$team_id);
        $this->db->join('teams', 'teams.team_id=teams_users.team_id','left');
        $this->db->join('users_details', 'users_details.user_id=teams_users.user_id','left');
        $this->db->join('users', 'users.user_id=users_details.user_id','left');

        $queryResult=$this->db->get();
        $this->db->trans_complete();



        return $queryResult->result();

    }

    function get_by_team_id_array($teamIdArray){

        $this->db->trans_start();
        $this->db->order_by($this->id, $this->order);
        $this->db->select('*');
        $this->db->from($this->table);

        $this->db->where_in( $this->table.'.team_id',$teamIdArray);

        $this->db->join('users_details', 'users_details.user_id=teams_users.user_id','left');
        $this->db->join('users', 'users.user_id=users_details.user_id','left');
        $this->db->join('roles' ,'roles.role_id=users_details.role_id','inner');
        $queryResult=$this->db->get();
        $this->db->trans_complete();



        return $queryResult->result();

    }


    function get_team_and_users_details(){
        $this->db->select('*');
        $this->db->from($this->table);
        $this->db->join('teams', 'teams.team_id=teams_users.team_id','left');
        $this->db->join('users_details', 'users_details.user_id=teams_users.user_id','left');
        $queryResult=$this->db->get();
        $this->db->trans_complete();
        return $queryResult->result();

    }

}

