<?php
namespace App\Http\Controllers\Api;

use App\Service\PdfService;
use Dompdf\Dompdf;
use App\Service\BusinessService;

class PdfController{

    public function byCity($id, $categoryId=Null){
        $data = BusinessService::getBusinessByCity($id, $allData=True);
        $html = PdfService::htmlBuilder($data, $categoryId);
        $this->toPdf($html);
    }

    public function byState($id, $categoryId=Null){
        $data = BusinessService::getBusinessByState($id, $allData=True);
        $html = PdfService::htmlBuilder($data, $categoryId);
        $this->toPdf($html);
    }

    private function toPdf($html){
        $dompdf = new Dompdf();
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        $dompdf->stream();
    }

    /* Tests purposes */
    private function toJsonResponse($data){
        return response()->json($data, 200, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
    }

}

