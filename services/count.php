<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("connection.php");


class Pss extends connection
{


    function __construct()
    {
        $this->connectionDB();

        $result = $this->get_data();
        echo json_encode($result);



    }

    public function get_data()
    {
        $output = array();

        $dist=$_REQUEST['dist'];
        $teh=$_REQUEST['teh'];


//        $sql1="SELECT jsonb_build_object(
//    'type',     'FeatureCollection',
//    'features', jsonb_agg(features.feature)
//)
//FROM (
//  SELECT jsonb_build_object(
//    'type',       'Feature',
//    'id',         gid,
//    'geometry',   ST_AsGeoJSON(geom)::jsonb,
//    'properties', to_jsonb(inputs) - 'gid' - 'geom'
//  ) AS feature
//  FROM
//(with foo as (select  survey_data->>'lat' as lat,survey_data->>'lng' as lng from  tbl_survey_data_raw)
//select pk_id as gid,image_path,survey_data->>'scheme_name' as scheme_name,survey_data->>'address' as address,
//survey_data->>'house_no' as house_no,survey_data->>'plot_size' as plot_size,
//survey_data->>'landuse' as landuse,survey_data->>'house_progress' as house_progress,
//survey_data->>'remarks' as remarks,ST_GeomFromText('POINT('||b.lng||' '||b.lat||')',4326) as geom
//from tbl_survey_data_raw a,(select * from foo) as b) inputs) as features;";

        $sql1="select count (*) from tbl_survey_data_raw where survey_data->>'district' ilike '$dist' and survey_data->>'tehsil' ilike '$teh' ";
		
		$sql2 = "select sum(case when survey_data->>'landuse' = 'Commercial' then 1 else 0 end) as Commercial , 
				sum(case WHen survey_data->>'landuse' = 'Residential' then 1 else 0 end) as Residential 
				from tbl_survey_data_raw ";


        $result_query1 = pg_query($sql1);
        if ($result_query1) {
            $output['count']= pg_fetch_all($result_query1);
        }
		
		        $result_query2 = pg_query($sql2);
        if ($result_query2) {
            $output['landuse']= pg_fetch_all($result_query2);
        }




        $this->closeConnection();
        return $output;
    }

}

$json = new Pss();
//$json->closeConnection();
// echo $json->loadData();


?>