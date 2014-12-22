<?php
defined('_JEXEC') or die('Restricted access'); // no direct access
$doc->addStyleSheet(JURI::Base(). 'components/com_rpl/js/jquery.checkbox/jquery.safari-checkbox.css');
$doc->addStyleSheet(JURI::Base(). 'components/com_rpl/js/jquery.checkbox/jquery.checkbox.css');
$doc->addScript(JURI::Base().'components/com_rpl/js/jquery.checkbox/jquery.checkbox.js');
$doc->addScript(JURI::Base().'templates/rpl_twenty_eight/html/mod_rpl_search/js/jquery.ui.touch-punch.min.js');
require(JPATH_SITE.DS.'modules'.DS.'mod_rpl_search'.DS.'tmpl'.DS.'js.php');
?>
<script type="text/javascript">
jQuery(document).ready(function(e) {
	jQuery( '.rpl_top_search #sf<?php echo $mod_id;?>_selectcategory option[value="-1"]' ).text("<?php echo JTEXT::_('PROPERTY_TYPE');?>");
	jQuery('#rpl_search_form<?php echo $mod_id;?> input:checkbox:not(.yesno)').checkbox({cls:'jquery-safari-checkbox',empty:'<?php echo JURI::Base()?>components/com_rpl/js/jquery.checkbox/empty.png'});
	jQuery('#rpl_search_form<?php echo $mod_id;?> input.yesno:checkbox').checkbox({empty:'<?php echo JURI::Base()?>components/com_rpl/js/jquery.checkbox/empty.png'});
   	jQuery('#rpl_search_form<?php echo $mod_id;?> .search_sixth_item .PW_price_container a.selectyzeValue').html('<?php echo JTEXT::_('UNIT') ?>');
	jQuery('#rpl_search_form<?php echo $mod_id;?> .search_sixth_item .rpl_searchmod_mm_select_container a.selectyzeValue').html('<?php echo JTEXT::_('PRICE') ?>');
	jQuery('#rpl_search_form<?php echo $mod_id;?> .options').click(function(){
		jQuery('#rpl_search_form<?php echo $mod_id;?> .bott_block').slideToggle(800);
		jQuery('#rpl_search_form<?php echo $mod_id;?> .options').toggleClass('less','','more');	
	});
	jQuery('#rpl_search_form<?php echo $mod_id;?> #rpl_search_li2 select option:first').text(jQuery('#rpl_search_form<?php echo $mod_id;?> #rpl_search_li2 .search_name').text());
	jQuery('#rpl_search_form<?php echo $mod_id;?> #rpl_search_li3 select option:first').text(jQuery('#rpl_search_form<?php echo $mod_id;?> #rpl_search_li3 .search_name').text());
	jQuery('#rpl_search_form<?php echo $mod_id;?> #rpl_search_li6 select.rpl_searchmod_mm_select').prepend('<option selected="selected"><?php echo JTEXT::_('PRICE'); ?></option>');
	jQuery('#rpl_search_form<?php echo $mod_id;?> #rpl_search_li8 select').prepend('<option selected="selected"><?php echo JTEXT::_('BATH'); ?></option>');
	jQuery('#rpl_search_form<?php echo $mod_id;?> #rpl_search_li9 select').prepend('<option selected="selected"><?php echo JTEXT::_('BED'); ?></option>');
	jQuery('#rpl_search_form<?php echo $mod_id;?> #rpl_search_li13 select').prepend('<option selected="selected"><?php echo JTEXT::_('ROOMS'); ?></option>');
	jQuery('#rpl_search_form<?php echo $mod_id;?> .minmax_selectbox_plus').find('span[class*="PW"]').parent().addClass('with_pw');
	jQuery('#rpl_search_form<?php echo $mod_id;?>').find('.minmax_selectbox_plus:not(.with_pw)').addClass('without_pw');
	jQuery("#rpl_search_form<?php echo $mod_id;?> select").chosen({disable_search_threshold: 10});	
	
	
});
</script>
<div class="hsearch container">
	<form id="rpl_search_form<?php echo $mod_id;?>" onsubmit="return false;" method="get" class="clearfix">
	<div id="rpl_search_<?php echo $mod_id;?>" class="rpl_search_mod<?php echo $moduleclass_sfx?> search_content_box">
		<?php 
		$top_block_id=array(41,2,3,6,8,9,13);
		$top_block='';$bott_block='';$currently='';
		foreach  ($resulted_fields as $field)
		{
			$field_style = ($field['display'] !=='')?' style="'.$field['display'].'"':'';
		
			if ($field['field']->type == 'separator')
			{
			}
			elseif ($field['options'] == 'predefined' )
			{
				$currently .=  '<li id="rpl_search_li'.$field['field']->id.'" class="'.$field['options'].'_li">'.$field['rendered'] .'</li>';
			}
			elseif ($field['options'] == 'checkboxes' )
			{
				$currently .=  '<li id="rpl_search_li'.$field['field']->id.'"'.$field_style.' class="'.$field['options'].'_li"><div class="search_name_listings">'.JTEXT::_($field['field']->name) .'</div>'.$field['rendered'] .'</li>';
			}
			elseif ($field['options'] == 'minmax_slider')
			{
				$currently .=  '<li'.$field_style.' id="rpl_search_li'.$field['field']->id.'" class="'.$field['options'].'_li"><div class="search_name_slider">'.JTEXT::_($field['field']->name) .'</div>'.$field['rendered'] .'</li>';
			}
			elseif ($field['options'] == 'text' || $field['options'] == 'select'||  $field['options'] == 'select-predefined'|| $field['options'] == 'yesno' )
			{
				$currently .=  '<li id="rpl_search_li'.$field['field']->id.'"'.$field_style.' class="'.$field['options'].'_li"><span class="search_name">'.JTEXT::_($field['field']->name) .' </span>';
				$currently .=  '<span>'.$field['rendered'].'</span></li>';
			}
			elseif ($field['options'] == 'checkbox')
			{
				$currently .=  '<li id="rpl_search_li'.$field['field']->id.'"'.$field_style.' class="'.$field['options'].'_li">';
				$currently .=  '<span>'.$field['rendered'] .' '.JTEXT::_($field['field']->name) .'</span></li>';
			}
			else
			{
				$has_pw = (strpos($field['rendered'], "PW_") !== false)?' has_pw':'';
				$currently .=  '<li id="rpl_search_li'.$field['field']->id.'"'.$field_style.' class="'.$field['options'].$has_pw.'"><span class="search_name">'.JTEXT::_($field['field']->name) .'</span>'.$field['rendered'];
				$currently .=  '</li>';
			}
			$currently .=  "\r\n";
			
			if(in_array($field['field']->id,$top_block_id)){
				$top_block.=$currently;
			}else{
				$bott_block.=$currently;
			}
			$currently ='';
		}
		$top_block.='<li class="search_btn_li"><button class="rpl_search_button button" onclick="rpl_do_search'.$mod_id.'()">'.JTEXT::_('SEARCH').'</button>';
		$top_block.= ($reset_button)?'<span class="reset button" onclick="rpl_do_reset'.$mod_id.'();">'.JTEXT::_('RESET').'</span>':'';		
		$top_block.= '</li>';
		echo '<div class="top_block"><ul class="fields_list">'.$top_block.'</ul></div><div class="bott_block" style="display:none;"><ul class="fields_list">'.$bott_block.'</ul></div>';
		?>
	</div>
	<div class="footer">
		<span class="options more"><?php echo JTEXT::_('MORE_OPTION');?></span>	
	</div>
	<div class="clearfix"></div>
	</form>
</div>