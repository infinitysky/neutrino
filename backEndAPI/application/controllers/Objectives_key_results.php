<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Objectives_key_results extends CI_Controller
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
        };

        parent::__construct();
        $this->load->model('Objectives_key_results_model');
        $this->load->library('form_validation');        
	$this->load->library('datatables');
    }

    public function index()
    {
        $this->getall();
    }


    public function json($resArray) {
        header('Content-Type: application/json');
        echo json_encode($resArray);
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


            //  goal_description can be empty
            if (empty($Data['goal_name'])) {
                echo json_encode($this->create_error_messageArray("team_name Empty"));
                return 0;
            }elseif (empty($Data['goal_name'])){
                echo json_encode($this->create_error_messageArray("goal_name Empty"));
                return 0;
            }
            elseif (empty($Data['time_frame_id'])){
                echo json_encode($this->create_error_messageArray("time_frame_id Empty"));
                return 0;
            }
            else {

                $processArray = array(
                    'goal_id' =>$Data['goal_id'],
                    'goal_name' => $Data['goal_name'],
                    'goal_description' => $Data['goal_description'],
                    'time_frame_id'=>$Data['time_frame_id'],
                );
                return $processArray;
            }
        }
    }

    //Main entrance
    public function items($id)
    {
        $Data = json_decode(trim(file_get_contents('php://input')), true);
        //GET, POST, OPTIONS, PUT, DELETE
        $method = $_SERVER['REQUEST_METHOD'];
        if($method == "OPTIONS") {
            die();
        }elseif ($method == "GET"){

            $this->read($id);
        }elseif ($method == "PUT"){

            $this->update($id,$Data);
        }elseif ($method == "DELETE"){

            $this->delete($id);
        }

    }





    public function read($id) 
    {
        $row = $this->Objectives_key_results_model->get_by_id($id);
        if ($row) {
            $data = array(
		'id' => $row->id,
		'objective_id' => $row->objective_id,
		'result_id' => $row->result_id,
	    );
            $this->load->view('objectives_key_results/objectives_key_results_read', $data);
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('objectives_key_results'));
        }
    }

    public function create() 
    {
        $data = array(
            'button' => 'Create',
            'action' => site_url('objectives_key_results/create_action'),
	    'id' => set_value('id'),
	    'objective_id' => set_value('objective_id'),
	    'result_id' => set_value('result_id'),
	);
        $this->load->view('objectives_key_results/objectives_key_results_form', $data);
    }
    
    public function create_action() 
    {
        $this->_rules();

        if ($this->form_validation->run() == FALSE) {
            $this->create();
        } else {
            $data = array(
		'objective_id' => $this->input->post('objective_id',TRUE),
		'result_id' => $this->input->post('result_id',TRUE),
	    );

            $this->Objectives_key_results_model->insert($data);
            $this->session->set_flashdata('message', 'Create Record Success');
            redirect(site_url('objectives_key_results'));
        }
    }
    
    public function update($id) 
    {
        $row = $this->Objectives_key_results_model->get_by_id($id);

        if ($row) {
            $data = array(
                'button' => 'Update',
                'action' => site_url('objectives_key_results/update_action'),
		'id' => set_value('id', $row->id),
		'objective_id' => set_value('objective_id', $row->objective_id),
		'result_id' => set_value('result_id', $row->result_id),
	    );
            $this->load->view('objectives_key_results/objectives_key_results_form', $data);
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('objectives_key_results'));
        }
    }
    
    public function update_action() 
    {
        $this->_rules();

        if ($this->form_validation->run() == FALSE) {
            $this->update($this->input->post('id', TRUE));
        } else {
            $data = array(
		'objective_id' => $this->input->post('objective_id',TRUE),
		'result_id' => $this->input->post('result_id',TRUE),
	    );

            $this->Objectives_key_results_model->update($this->input->post('id', TRUE), $data);
            $this->session->set_flashdata('message', 'Update Record Success');
            redirect(site_url('objectives_key_results'));
        }
    }
    
    public function delete($id) 
    {
        $row = $this->Objectives_key_results_model->get_by_id($id);

        if ($row) {
            $this->Objectives_key_results_model->delete($id);
            $this->session->set_flashdata('message', 'Delete Record Success');
            redirect(site_url('objectives_key_results'));
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('objectives_key_results'));
        }
    }

    public function _rules() 
    {
	$this->form_validation->set_rules('objective_id', 'objective id', 'trim|required');
	$this->form_validation->set_rules('result_id', 'result id', 'trim|required');

	$this->form_validation->set_rules('id', 'id', 'trim');
	$this->form_validation->set_error_delimiters('<span class="text-danger">', '</span>');
    }

}

/* End of file Objectives_key_results.php */
/* Location: ./application/controllers/Objectives_key_results.php */
/* Please DO NOT modify this information : */
/* Generated by Harviacode Codeigniter CRUD Generator 2017-01-30 11:54:10 */
/* http://harviacode.com */