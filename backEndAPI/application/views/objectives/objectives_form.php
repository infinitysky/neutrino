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
        <h2 style="margin-top:0px">Objectives <?php echo $button ?></h2>
        <form action="<?php echo $action; ?>" method="post">
	    <div class="form-group">
            <label for="objective_description">Objective Description <?php echo form_error('objective_description') ?></label>
            <textarea class="form-control" rows="3" name="objective_description" id="objective_description" placeholder="Objective Description"><?php echo $objective_description; ?></textarea>
        </div>
	    <input type="hidden" name="objective_id" value="<?php echo $objective_id; ?>" /> 
	    <button type="submit" class="btn btn-primary"><?php echo $button ?></button> 
	    <a href="<?php echo site_url('objectives') ?>" class="btn btn-default">Cancel</a>
	</form>
    </body>
</html>