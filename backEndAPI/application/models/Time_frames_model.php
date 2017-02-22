<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Time_frames_model extends CI_Model
{

    public $table = 'time_frames';
    public $id = 'time_frame_id';
    public $order = 'ASC';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    // datatables
    function json() {
        $this->datatables->select('time_frame_id,time_frame_description,time_frame_start,time_frame_end');
        $this->datatables->from('time_frames');
        //add this line for join
        //$this->datatables->join('table2', 'time_frames.field = table2.field');
        $this->datatables->add_column('action', anchor(site_url('time_frames/read/$1'),'Read')." | ".anchor(site_url('time_frames/update/$1'),'Update')." | ".anchor(site_url('time_frames/delete/$1'),'Delete','onclick="javasciprt: return confirm(\'Are You Sure ?\')"'), 'time_freame_id');
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
        $this->db->like('time_frame_id', $q);
        $this->db->or_like('time_frame_description', $q);
        $this->db->or_like('time_frame_start', $q);
        $this->db->or_like('time_frame_end', $q);
        $this->db->from($this->table);
        return $this->db->count_all_results();
    }

    // get data with limit and search
    function get_limit_data($limit, $start = 0, $q = NULL) {
        $this->db->order_by($this->id, $this->order);
        $this->db->like('time_frame_id', $q);
        $this->db->or_like('time_frame_description', $q);
        $this->db->or_like('time_frame_start', $q);
        $this->db->or_like('time_frame_end', $q);
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
    function getRangeTime(){
        $this->db->trans_start();
        $sql = "select * 
            from time_frames 
            where  DATE(NOW()) between time_frames.time_frame_start and time_frames.time_frame_end 
            order by time_frame_id DESC";
        $query = $this->db->query($sql)->result();
        $this->db->trans_complete();
        //return $this->db->get()->result();
        return $query;

    }


}

