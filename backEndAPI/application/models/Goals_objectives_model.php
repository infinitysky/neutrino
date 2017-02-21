<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Goals_objectives_model extends CI_Model
{

    public $table = 'goals_objectives';
    public $id = 'id';
    public $order = 'DESC';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    // datatables
    function json() {
        $this->datatables->select('id,goal_id,objective_id');
        $this->datatables->from('goals_objectives');
        //add this line for join
        //$this->datatables->join('table2', 'goals_objectives.field = table2.field');
        $this->datatables->add_column('action', anchor(site_url('goals_objectives/read/$1'),'Read')." | ".anchor(site_url('goals_objectives/update/$1'),'Update')." | ".anchor(site_url('goals_objectives/delete/$1'),'Delete','onclick="javasciprt: return confirm(\'Are You Sure ?\')"'), 'id');
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
        $this->db->or_like('objective_id', $q);
        $this->db->from($this->table);
        return $this->db->count_all_results();
    }

    // get data with limit and search
    function get_limit_data($limit, $start = 0, $q = NULL) {
        $this->db->order_by($this->id, $this->order);
        $this->db->like('id', $q);
        $this->db->or_like('goal_id', $q);
        $this->db->or_like('objective_id', $q);
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




    // delete data
    function delete_by_objective_id_goal_id($objectiveId,$goalId)
    {

        $this->db->trans_start();

        $this->db->where('objective_id', $objectiveId);
        $this->db->where('goal_id', $goalId);

        $this->db->delete($this->table);
        $affectedRowsNumber=$this->db->affected_rows();
        $this->db->trans_complete();
        return $affectedRowsNumber;

    }


    //The idea is comes from DELETE FROM `goals_objectives` WHERE `goals_objectives`.`goal_id`=3 AND `goals_objectives`.`objective_id` IN (87,88,89)

    function batch_delete_by_objective_id($objective_id,$goalDataArray)
    {
        $this->db->trans_start();

        $this->db->where('objective_id', $objective_id);
        $this->db->where_in('goal_id', $goalDataArray);

        $this->db->delete($this->table);
        $affectedRowsNumber=$this->db->affected_rows();
        $this->db->trans_complete();
        return $affectedRowsNumber;

    }

    function batch_delete_by_goal_id($goalId,$objectiveIdDataArray)
    {
        $this->db->trans_start();
        $this->db->where('goal_id', $goalId);
        $this->db->where_in('objective_id', $objectiveIdDataArray);
        $this->db->delete($this->table);
        $affectedRowsNumber=$this->db->affected_rows();
        $this->db->trans_complete();
        return $affectedRowsNumber;

    }

    function delete_by_objective_id($userId)
    {
        $this->db->trans_start();


        $this->db->where_in('goal_id', $userId);

        $this->db->delete($this->table);
        $affectedRowsNumber=$this->db->affected_rows();
        $this->db->trans_complete();
        return $affectedRowsNumber;

    }

    function delete_by_goal_id($goal_id)
    {
        $this->db->trans_start();


        $this->db->where_in('goal_id', $goal_id);

        $this->db->delete($this->table);
        $affectedRowsNumber=$this->db->affected_rows();
        $this->db->trans_complete();
        return $affectedRowsNumber;

    }



    function get_by_objective_id($objectiveId){
        $this->db->trans_start();
        $this->db->order_by($this->id, $this->order);
        $this->db->select('*');
        $this->db->from($this->table);
        $this->db->where($this->table.'.objective_id',$objectiveId);
        $this->db->join('goals', $this->table.'.goal_id=goals.goal_id','left');
        $this->db->join('objectives', $this->table.'.objective_id=objectives.objective_id','left');


        $result=$this->db->get();
        $this->db->trans_complete();


        //echo $this->db->last_query();

        return $result->result();



    }
    function get_by_goal_id($goalId){

        $this->db->trans_start();
        $this->db->order_by($this->id, $this->order);
        $this->db->select('*');
        $this->db->from($this->table);

        $this->db->where($this->table.'.goal_id',$goalId);
        $this->db->join('goals', $this->table.'.goal_id=goals.goal_id','left');
        $this->db->join('objectives', $this->table.'.objective_id=objectives.objective_id','left');


        $result=$this->db->get();
        $this->db->trans_complete();


        return $result->result();

    }




}
