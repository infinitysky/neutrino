<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
 * Created by PhpStorm.
 * User: cliff
 * Date: 18/04/2017
 * Time: 15:18
 */
class Home_page_model extends CI_Model
{

    public $goals_table = 'goals';
    public $goals_objectives_table = 'goals_objectives';
    public $teams_table = 'teams';
    public $teams_objectives = 'teams_objectives';

    public $id = 'goal_id';
    public $order = 'DESC';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    function getUserGoals($userId,$timeFrame){
        $this->db->select('*');
        $this->db->from($this->goals_table);
        $this->db->join($this->goals_table);
        $this->db->join($this->goals_table);
        $this->db->join($this->goals_table);
        $this->db->where();
        $this->db->where($this->goals_table.'.time_frame_id',$timeFrame);

    }


}