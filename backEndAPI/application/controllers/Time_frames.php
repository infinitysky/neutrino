<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Time_frames extends CI_Controller
{
	function __construct()
	    {
		header('Content-type: application/json');
		header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS") {
			die();
		}
		
		parent::__construct();
		
		$this->load->model('Time_frames_model');
		$this->load->library('form_validation');
		$this->load->library('datatables');
	}
	
	public function index()
	    {
		
		
	}
	
	
	public function getall()
	    {
		$tempData=$this->Time_frames_model->get_all();
		echo $this->json($tempData);
		
	}
	

    public function json($resArray) {
        header('Content-Type: application/json');
        echo json_encode($resArray);
       
    }

	
	public function read($id) 
	    {
		$row = $this->Time_frames_model->get_by_id($id);
		if ($row) {
			$data = array(
					'time_freame_id' => $row->time_freame_id,
					'time_frame_description' => $row->time_frame_description,
					'time_frame_start' => $row->time_frame_start,
					'time_frame_end' => $row->time_frame_end,
				    );
			$this->load->view('time_frames/time_frames_read', $data);
		}
		else {
			$this->session->set_flashdata('message', 'Record Not Found');
			redirect(site_url('time_frames'));
		}
	}
	
	public function create() 
	{
        $Data = json_decode(trim(file_get_contents('php://input')), true);
		$checkArray=$this->dataValidate($Data);
        if($checkFlag!=0){
            $this->create_action($processArray);
        }


	}
	
	public function create_action($processArray) 
	{
		
		$this->Time_frames_model->insert($processArray);
			
		
	}
	
	public function update($id) 
	    {
		$row = $this->Time_frames_model->get_by_id($id);
		
		if ($row) {
			$data = array(
					'time_freame_id' => set_value('time_freame_id', $row->time_freame_id),
					'time_frame_description' => set_value('time_frame_description', $row->time_frame_description),
					'time_frame_start' => set_value('time_frame_start', $row->time_frame_start),
					'time_frame_end' => set_value('time_frame_end', $row->time_frame_end),
				    );
			$this->load->view('time_frames/time_frames_form', $data);
		}
		else {
			$this->session->set_flashdata('message', 'Record Not Found');
			redirect(site_url('time_frames'));
		}
	}
	
	public function update_action() 
	    {
		$this->_rules();
		
		if ($this->form_validation->run() == FALSE) {
			$this->update($this->input->post('time_freame_id', TRUE));
		}
		else {
			$data = array(
					'time_frame_description' => $this->input->post('time_frame_description',TRUE),
					'time_frame_start' => $this->input->post('time_frame_start',TRUE),
					'time_frame_end' => $this->input->post('time_frame_end',TRUE),
				    );
			
			$this->Time_frames_model->update($this->input->post('time_freame_id', TRUE), $data);
			$this->session->set_flashdata('message', 'Update Record Success');
			redirect(site_url('time_frames'));
		}
	}
	
	public function delete($id) 
	    {
		$row = $this->Time_frames_model->get_by_id($id);
		
		if ($row) {
			$this->Time_frames_model->delete($id);
			$this->session->set_flashdata('message', 'Delete Record Success');
			redirect(site_url('time_frames'));
		}
		else {
			$this->session->set_flashdata('message', 'Record Not Found');
			redirect(site_url('time_frames'));
		}
	}
	
	public function _rules() 
	    {
		$this->form_validation->set_rules('time_frame_description', 'time frame description', 'trim|required');
		$this->form_validation->set_rules('time_frame_start', 'time frame start', 'trim|required');
		$this->form_validation->set_rules('time_frame_end', 'time frame end', 'trim|required');
		
		$this->form_validation->set_rules('time_freame_id', 'time_freame_id', 'trim');
		$this->form_validation->set_error_delimiters('<span class="text-danger">', '</span>');
	}
	
	
	public function dataValidate($Data){
		
		if(empty($Data)){
			
			echo json_encode( $this->create_error_messageArray("Message Empty"));
			
			return 0;
			
		}
		else {
			
			if (empty($Data['time_frame_description'])) {
				echo json_encode($this->create_error_messageArray("time_frame_description Empty"));
				return 0;
			}
			elseif (empty($Data['time_frame_start'])) {
				echo json_encode($this->create_error_messageArray("time_frame_start Empty"));
				return 0;
			}
            elseif (empty($Data['time_frame_end'])) {
				echo json_encode($this->create_error_messageArray("time_frame_end Empty"));
				return 0;
			}
			else {
				$processArray = array(
				                    "time_frame_description" => $Data['time_frame_description'],
				                    "time_frame_start" => $Data['time_frame_start'],
                                    "time_frame_end" => $Data['time_frame_end'],
				                );
				return $processArray;
			}
		}
		
		
	}
    

	
}


/* End of file Time_frames.php */

/* Location: ./application/controllers/Time_frames.php */

/* Please DO NOT modify this information : */

/* Generated by Harviacode Codeigniter CRUD Generator 2017-01-30 11:54:10 */

/* http://harviacode.com */
