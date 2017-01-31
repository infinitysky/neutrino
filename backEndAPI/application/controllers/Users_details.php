<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Users_details extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('Users_details_model');
        $this->load->library('form_validation');        
	$this->load->library('datatables');
    }

    public function index()
    {
        $this->load->view('users_details/users_details_list');
    } 
    
    public function json() {
        header('Content-Type: application/json');
        echo $this->Users_details_model->json();
    }

    public function read($id) 
    {
        $row = $this->Users_details_model->get_by_id($id);
        if ($row) {
            $data = array(
		'user_details_id' => $row->user_details_id,
		'first_name' => $row->first_name,
		'last_name' => $row->last_name,
		'dob' => $row->dob,
		'mobile_number' => $row->mobile_number,
		'user_id' => $row->user_id,
	    );
            $this->load->view('users_details/users_details_read', $data);
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('users_details'));
        }
    }

    public function create() 
    {
        $data = array(
            'button' => 'Create',
            'action' => site_url('users_details/create_action'),
	    'user_details_id' => set_value('user_details_id'),
	    'first_name' => set_value('first_name'),
	    'last_name' => set_value('last_name'),
	    'dob' => set_value('dob'),
	    'mobile_number' => set_value('mobile_number'),
	    'user_id' => set_value('user_id'),
	);
        $this->load->view('users_details/users_details_form', $data);
    }
    
    public function create_action() 
    {
        $this->_rules();

        if ($this->form_validation->run() == FALSE) {
            $this->create();
        } else {
            $data = array(
		'first_name' => $this->input->post('first_name',TRUE),
		'last_name' => $this->input->post('last_name',TRUE),
		'dob' => $this->input->post('dob',TRUE),
		'mobile_number' => $this->input->post('mobile_number',TRUE),
		'user_id' => $this->input->post('user_id',TRUE),
	    );

            $this->Users_details_model->insert($data);
            $this->session->set_flashdata('message', 'Create Record Success');
            redirect(site_url('users_details'));
        }
    }
    
    public function update($id) 
    {
        $row = $this->Users_details_model->get_by_id($id);

        if ($row) {
            $data = array(
                'button' => 'Update',
                'action' => site_url('users_details/update_action'),
		'user_details_id' => set_value('user_details_id', $row->user_details_id),
		'first_name' => set_value('first_name', $row->first_name),
		'last_name' => set_value('last_name', $row->last_name),
		'dob' => set_value('dob', $row->dob),
		'mobile_number' => set_value('mobile_number', $row->mobile_number),
		'user_id' => set_value('user_id', $row->user_id),
	    );
            $this->load->view('users_details/users_details_form', $data);
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('users_details'));
        }
    }
    
    public function update_action() 
    {
        $this->_rules();

        if ($this->form_validation->run() == FALSE) {
            $this->update($this->input->post('user_details_id', TRUE));
        } else {
            $data = array(
		'first_name' => $this->input->post('first_name',TRUE),
		'last_name' => $this->input->post('last_name',TRUE),
		'dob' => $this->input->post('dob',TRUE),
		'mobile_number' => $this->input->post('mobile_number',TRUE),
		'user_id' => $this->input->post('user_id',TRUE),
	    );

            $this->Users_details_model->update($this->input->post('user_details_id', TRUE), $data);
            $this->session->set_flashdata('message', 'Update Record Success');
            redirect(site_url('users_details'));
        }
    }
    
    public function delete($id) 
    {
        $row = $this->Users_details_model->get_by_id($id);

        if ($row) {
            $this->Users_details_model->delete($id);
            $this->session->set_flashdata('message', 'Delete Record Success');
            redirect(site_url('users_details'));
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('users_details'));
        }
    }

    public function _rules() 
    {
	$this->form_validation->set_rules('first_name', 'first name', 'trim|required');
	$this->form_validation->set_rules('last_name', 'last name', 'trim|required');
	$this->form_validation->set_rules('dob', 'dob', 'trim|required');
	$this->form_validation->set_rules('mobile_number', 'mobile number', 'trim|required');
	$this->form_validation->set_rules('user_id', 'user id', 'trim|required');

	$this->form_validation->set_rules('user_details_id', 'user_details_id', 'trim');
	$this->form_validation->set_error_delimiters('<span class="text-danger">', '</span>');
    }

}

/* End of file Users_details.php */
/* Location: ./application/controllers/Users_details.php */
/* Please DO NOT modify this information : */
/* Generated by Harviacode Codeigniter CRUD Generator 2017-01-30 11:54:10 */
/* http://harviacode.com */