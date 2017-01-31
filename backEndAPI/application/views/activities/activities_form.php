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
        <h2 style="margin-top:0px">Activities <?php echo $button ?></h2>
        <form action="<?php echo $action; ?>" method="post">
	    <div class="form-group">
            <label for="activity_detail">Activity Detail <?php echo form_error('activity_detail') ?></label>
            <textarea class="form-control" rows="3" name="activity_detail" id="activity_detail" placeholder="Activity Detail"><?php echo $activity_detail; ?></textarea>
        </div>
	    <input type="hidden" name="activity_id" value="<?php echo $activity_id; ?>" /> 
	    <button type="submit" class="btn btn-primary"><?php echo $button ?></button> 
	    <a href="<?php echo site_url('activities') ?>" class="btn btn-default">Cancel</a>
	</form>
    </body>
</html>