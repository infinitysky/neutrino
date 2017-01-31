<!doctype html>
<html>
    <head>
        <title>harviacode.com - codeigniter crud generator</title>
        <link rel="stylesheet" href="<?php echo base_url('assets/bootstrap/css/bootstrap.min.css') ?>"/>
        <style>
            body{
                padding: 15px;
            }
        </style>
    </head>
    <body>
        <h2 style="margin-top:0px">Time_frames Read</h2>
        <table class="table">
	    <tr><td>Time Frame Description</td><td><?php echo $time_frame_description; ?></td></tr>
	    <tr><td>Time Frame Start</td><td><?php echo $time_frame_start; ?></td></tr>
	    <tr><td>Time Frame End</td><td><?php echo $time_frame_end; ?></td></tr>
	    <tr><td></td><td><a href="<?php echo site_url('time_frames') ?>" class="btn btn-default">Cancel</a></td></tr>
	</table>
        </body>
</html>