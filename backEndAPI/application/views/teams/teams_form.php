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
        <h2 style="margin-top:0px">Teams <?php echo $button ?></h2>
        <form action="<?php echo $action; ?>" method="post">
	    <div class="form-group">
            <label for="team_description">Team Description <?php echo form_error('team_description') ?></label>
            <textarea class="form-control" rows="3" name="team_description" id="team_description" placeholder="Team Description"><?php echo $team_description; ?></textarea>
        </div>
	    <div class="form-group">
            <label for="varchar">Team Name <?php echo form_error('team_name') ?></label>
            <input type="text" class="form-control" name="team_name" id="team_name" placeholder="Team Name" value="<?php echo $team_name; ?>" />
        </div>
	    <input type="hidden" name="team_id" value="<?php echo $team_id; ?>" /> 
	    <button type="submit" class="btn btn-primary"><?php echo $button ?></button> 
	    <a href="<?php echo site_url('teams') ?>" class="btn btn-default">Cancel</a>
	</form>
    </body>
</html>