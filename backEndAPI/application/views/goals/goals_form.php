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
        <h2 style="margin-top:0px">Goals <?php echo $button ?></h2>
        <form action="<?php echo $action; ?>" method="post">
	    <div class="form-group">
            <label for="goal_description">Goal Description <?php echo form_error('goal_description') ?></label>
            <textarea class="form-control" rows="3" name="goal_description" id="goal_description" placeholder="Goal Description"><?php echo $goal_description; ?></textarea>
        </div>
	    <input type="hidden" name="goal_id" value="<?php echo $goal_id; ?>" /> 
	    <button type="submit" class="btn btn-primary"><?php echo $button ?></button> 
	    <a href="<?php echo site_url('goals') ?>" class="btn btn-default">Cancel</a>
	</form>
    </body>
</html>