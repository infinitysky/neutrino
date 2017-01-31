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
        <h2 style="margin-top:0px">Goals_objectives <?php echo $button ?></h2>
        <form action="<?php echo $action; ?>" method="post">
	    <div class="form-group">
            <label for="int">Goal Id <?php echo form_error('goal_id') ?></label>
            <input type="text" class="form-control" name="goal_id" id="goal_id" placeholder="Goal Id" value="<?php echo $goal_id; ?>" />
        </div>
	    <div class="form-group">
            <label for="int">Objective Id <?php echo form_error('objective_id') ?></label>
            <input type="text" class="form-control" name="objective_id" id="objective_id" placeholder="Objective Id" value="<?php echo $objective_id; ?>" />
        </div>
	    <input type="hidden" name="id" value="<?php echo $id; ?>" /> 
	    <button type="submit" class="btn btn-primary"><?php echo $button ?></button> 
	    <a href="<?php echo site_url('goals_objectives') ?>" class="btn btn-default">Cancel</a>
	</form>
    </body>
</html>