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
		};
		
		parent::__construct();
		
		$this->load->model('Time_frames_model');
		$this->load->library('form_validation');
		$this->load->library('datatables');
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
    public function index()
    {
        $this->getall();
    }

	
	
	public function getall()
    {
		$tempData=$this->Time_frames_model->get_all();

        //reformat date to (dd/mm/yyyy)
        $tempData=$this->reFormatDate($tempData);
        echo $this->json($tempData);
	}


	//Warning Because  the DateRangePicker required a specified date format. So every date type must been reformatted before it been send to front.
	public function reFormatDate($processArray){
        $arrlength = count($processArray);
	    for ($i=0;$i<$arrlength;$i++){

            $startDate=new DateTime($processArray[$i]->time_frame_start);
            $endDate= new DateTime($processArray[$i]->time_frame_end);
            $processArray[$i]->time_frame_start=$startDate->format('d-m-Y');
            $processArray[$i]->time_frame_end=$endDate->format('d-m-Y');


        }

       return $processArray;


    }

    public function json($resArray) {
        header('Content-Type: application/json');
        echo json_encode($resArray);
       
    }


    public function read($id)
	{
		$row = $this->Time_frames_model->get_by_id($id);
		if ($row) {
            $startDate=new DateTime($row->time_frame_start);
            $endDate=new DateTime($row->time_frame_end);

			$data = array(
					'time_freame_id' => $row->time_freame_id,
					'time_frame_description' => $row->time_frame_description,
					'time_frame_start' => $startDate->format('d/m/y'),
					'time_frame_end' => $endDate->format('d/m/y')
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



    public function update($id,$updateData)
    {
		$row = $this->Time_frames_model->get_by_id($id);
		
		if ($row) {
            $processArray=$this->dataValidate($updateData);
            $data = array(
                'time_frame_description' =>$processArray['time_frame_description'],
                'time_frame_start' => $processArray['time_frame_start'],
                'time_frame_end' => $processArray['time_frame_end'],
            );
            $affectedRowsNumber=$this->Time_frames_model->update($id, $data);
            $tempReturnArray=array(
                "status"=>'success',
                "affectRows"=>$affectedRowsNumber
            );
            $this->json($tempReturnArray);

        }
		else {

			$tempReturnArray=$this->create_error_messageArray('Record Not Found');
			$this->json($tempReturnArray);
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
                //$dt_start = new DateTime("@$start_epoch");
                $end_epoch =  $Data['time_frame_end'];
                //$dt_end = new DateTime("@$end_epoch");
                $dt_start = date('Y-m-d', "$start_epoch");
                $dt_end = date('Y-m-d', "$end_epoch");

				$processArray = array(
				                    "time_frame_description" => $Data['time_frame_description'],
				                    "time_frame_start" => $dt_start,
                                    "time_frame_end" => $dt_end,
				                );
				return $processArray;
			}
		}
	}



    public function dateRangeTest(){
        //print_r( $this->dateRange( '2010/07/26', '2010/08/05', '+1 week') );
        print_r( $this->dateRange( '2010/07/26', '2019/08/05', '+3 month') );
    }

    function dateRange( $first, $last, $step = '+3 month', $format = 'Y/m/d' ) {

        $dates = array();
        $current = strtotime( $first );
        $last = strtotime( $last );

        while( $current <= $last ) {

            $dates[] = date( $format, $current );
            $current = strtotime( $step, $current );
        }

        return $dates;
    }

}


/* End of file Time_frames.php */

/* Location: ./application/controllers/Time_frames.php */

/* Please DO NOT modify this information : */

/* Generated by Harviacode Codeigniter CRUD Generator 2017-01-30 11:54:10 */

/* http://harviacode.com */
