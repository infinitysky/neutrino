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
        <h2 style="margin-top:0px">Time_frames <?php echo $button ?></h2>
        <form action="<?php echo $action; ?>" method="post">
	    <div class="form-group">
            <label for="time_frame_description">Time Frame Description <?php echo form_error('time_frame_description') ?></label>
            <textarea class="form-control" rows="3" name="time_frame_description" id="time_frame_description" placeholder="Time Frame Description"><?php echo $time_frame_description; ?></textarea>
        </div>
	    <div class="form-group">
            <label for="date">Time Frame Start <?php echo form_error('time_frame_start') ?></label>
            <input type="text" class="form-control" name="time_frame_start" id="time_frame_start" placeholder="Time Frame Start" value="<?php echo $time_frame_start; ?>" />
        </div>
	    <div class="form-group">
            <label for="date">Time Frame End <?php echo form_error('time_frame_end') ?></label>
            <input type="text" class="form-control" name="time_frame_end" id="time_frame_end" placeholder="Time Frame End" value="<?php echo $time_frame_end; ?>" />
        </div>
	    <input type="hidden" name="time_freame_id" value="<?php echo $time_freame_id; ?>" /> 
	    <button type="submit" class="btn btn-primary"><?php echo $button ?></button> 
	    <a href="<?php echo site_url('time_frames') ?>" class="btn btn-default">Cancel</a>
	</form>
    </body>
</html>