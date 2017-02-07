<?php

//require APPPATH . '/libraries/REST_Controller.php';
//use Restserver\Libraries\REST_Controller;


if (!defined('BASEPATH'))
    exit('No direct script access allowed');
//REST_Controller
class Time_frames extends CI_Controller
//class Time_frames extends REST_Controller
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

	//Main entrance
    public function items($id)
    {
        //GET, POST, OPTIONS, PUT, DELETE
        $method = $_SERVER['REQUEST_METHOD'];
        if($method == "OPTIONS") {
            die();
        }elseif ($method == "GET"){

            $this->read($id);
        }elseif ($method == "PUT"){

            $this->update($id);
        }elseif ($method == "DELETE"){

            $this->delete($id);
        }

    }

	public function index()
    {
        $this->getall();

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
					'time_frame_end' => $row->time_frame_end
				    );
			$this->json($data);
		}
		else {
		    $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            $this->json($tempReturnArray);
		}
	}
	
	public function create() 
	{
        $Data = json_decode(trim(file_get_contents('php://input')), true);

		
		$checkArray=$this->dataValidate($Data);
        if($checkArray!=0){
            $last_insert_id=$this->Time_frames_model->insert($checkArray);
            $this->read($last_insert_id);
        }

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

			$tempReturnArray=$this->create_error_messageArray('Record Not Found');
			$this->json($tempReturnArray);
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
			$affectRow=$this->Time_frames_model->delete($id);
            $tempReturnArray=array(
                "status"=>'success',
                "affectRows"=>$affectRow
            );
            $this->json($tempReturnArray);
		}
		else {
			//$this->session->set_flashdata('message', 'Record Not Found');
            $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            $this->json($tempReturnArray);

		}
	}
	
    public function create_error_messageArray($message){
        $tempMessageArray=array(
            "statu"=>"error",
            "errorMassage"=>$message
        );
        return $tempMessageArray;
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

                $start_epoch =  $Data['time_frame_start'];
                $dt_start = new DateTime("@$start_epoch");
                $end_epoch =  $Data['time_frame_end'];
                $dt_end = new DateTime("@$end_epoch");

				$processArray = array(
				                    "time_frame_description" => $Data['time_frame_description'],
				                    "time_frame_start" => $dt_start->format('Y-m-d H:i:s'),
                                    "time_frame_end" => $dt_end->format('Y-m-d H:i:s'),
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
