<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Key_results extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('Key_results_model');
        $this->load->library('form_validation');        
	$this->load->library('datatables');
    }

    public function index()
    {
        $this->load->view('key_results/key_results_list');
    } 
    
    public function json() {
        header('Content-Type: application/json');
        echo $this->Key_results_model->json();
    }

    public function read($id) 
    {
        $row = $this->Key_results_model->get_by_id($id);
        if ($row) {
            $data = array(
		'result_id' => $row->result_id,
		'description' => $row->description,
	    );
            $this->load->view('key_results/key_results_read', $data);
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('key_results'));
        }
    }

    public function create() 
    {
        $data = array(
            'button' => 'Create',
            'action' => site_url('key_results/create_action'),
	    'result_id' => set_value('result_id'),
	    'description' => set_value('description'),
	);
        $this->load->view('key_results/key_results_form', $data);
    }
    
    public function create_action() 
    {
        $this->_rules();

        if ($this->form_validation->run() == FALSE) {
            $this->create();
        } else {
            $data = array(
		'description' => $this->input->post('description',TRUE),
	    );

            $this->Key_results_model->insert($data);
            $this->session->set_flashdata('message', 'Create Record Success');
            redirect(site_url('key_results'));
        }
    }
    
    public function update($id) 
    {
        $row = $this->Key_results_model->get_by_id($id);

        if ($row) {
            $data = array(
                'button' => 'Update',
                'action' => site_url('key_results/update_action'),
		'result_id' => set_value('result_id', $row->result_id),
		'description' => set_value('description', $row->description),
	    );
            $this->load->view('key_results/key_results_form', $data);
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('key_results'));
        }
    }
    
    public function update_action() 
    {
        $this->_rules();

        if ($this->form_validation->run() == FALSE) {
            $this->update($this->input->post('result_id', TRUE));
        } else {
            $data = array(
		'description' => $this->input->post('description',TRUE),
	    );

            $this->Key_results_model->update($this->input->post('result_id', TRUE), $data);
            $this->session->set_flashdata('message', 'Update Record Success');
            redirect(site_url('key_results'));
        }
    }
    
    public function delete($id) 
    {
        $row = $this->Key_results_model->get_by_id($id);

        if ($row) {
            $this->Key_results_model->delete($id);
            $this->session->set_flashdata('message', 'Delete Record Success');
            redirect(site_url('key_results'));
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('key_results'));
        }
    }

    public function _rules() 
    {
	$this->form_validation->set_rules('description', 'description', 'trim|required');

	$this->form_validation->set_rules('result_id', 'result_id', 'trim');
	$this->form_validation->set_error_delimiters('<span class="text-danger">', '</span>');
    }

}

/* End of file Key_results.php */
/* Location: ./application/controllers/Key_results.php */
/* Please DO NOT modify this information : */
/* Generated by Harviacode Codeigniter CRUD Generator 2017-01-30 11:54:09 */
/* http://harviacode.com */