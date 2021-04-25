<?php
namespace App\Http\Controllers\Api;

use Dompdf\Dompdf;
use App\Service\BusinessService;
use App\Service\CategoryService;

class PdfController{

    //http://localhost/public/api/pdf/city/1

    public function show($id, $categoryId=Null){
        $data = BusinessService::getBusinessByState($id, $allData=True);

        $html = $this->htmlBuilder($data, $categoryId);
        $this->toPdf($html);
    }

    private function toPdf($html){
        $dompdf = new Dompdf();
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        $dompdf->stream();
    }

    private function toJsonResponse($data){
        return response()->json(
            $data,
            200,
            ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],
            JSON_UNESCAPED_UNICODE);
    }

    private function htmlBuilder($data, int $categoryId=Null){
        $categoryName = '';
        if($categoryId) {
            $category = CategoryService::getCategoryById($categoryId);
            $categoryName = $category->name . ' | ';
        }

        $output = '
        <h1 style="margin-bottom:0px;">LocalBusiness</h1>
        <a href="puc.gabrielguerra.me">www.localbusiness.com.br</a>
        <h2>'.$categoryName.'Fornecedores em '.$this->getCityName($data).'</h2>
        <h3>RELATÓRIO PDF</h3>
        <table>
            <thead>
                <tr>
                    <td>EMPRESA</td>
                    <td>TELEFONE</td>
                </tr>
            </thead>
            <tbody>
        ';

        if($categoryId) {
            foreach ($data as $item) {
                if ($item->phone !== '' && $item->category_id==$categoryId) {
                    $output .= '<tr><td>' . $item->name . '</td><td>' . $item->phone . '</td></tr>';
                }
            }
        }else{
            foreach ($data as $item) {
                if ($item->phone !== '') {
                    $output .= '<tr><td>' . $item->name . '</td><td>' . $item->phone . '</td></tr>';
                }
            }
        }

        $output .= '</tbody></table>';
        return $output;
    }

    private function getCityName($data){
        foreach ($data as $item){
            if($item->city_name){
                return $item->city_name;
            }
        }
        return '';
    }
}

