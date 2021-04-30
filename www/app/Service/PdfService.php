<?php
namespace App\Service;

class PdfService{

    public static function htmlBuilder($data, int $categoryId=Null){
        $categoryName = '';
        if($categoryId) {
            $category = CategoryService::getCategoryById($categoryId);
            $categoryName = $category->name . ' | ';
        }

        $output = '
        <style>
        body{ font-family: sans-serif;}
        table{width: 100%; padding:0px; border-spacing:0px; border: 1px solid; border-right: 0px;}
        table thead{ background: #ccc; font-weight: bold;}
        td{ padding: 10px; border-right: 1px solid; border-bottom: 1px solid #ccc;}
        </style>

        <body>
        <h1 style="margin-bottom:0px;">LocalBusiness</h1>
        <a href="puc.gabrielguerra.me">www.localbusiness.com.br</a>
        <h3>RELATÓRIO PDF</h3>
        <table>
            <thead>
                <tr>
                    <td>EMPRESA</td>
                    <td>CIDADE</td>
                    <td>TELEFONE</td>
                </tr>
            </thead>
            <tbody>
        ';

        if($categoryId) {
            foreach ($data as $item) {
                if ($item->phone !== '' && $item->category_id==$categoryId) {
                    $output .= '<tr><td>' . $item->name . '</td>';
                    $output .= '<td>' . $item->city_name . '</td>';
                    $output .= '<td>' . $item->phone . '</td></tr>';
                }
            }
        }else{
            foreach ($data as $item) {
                if ($item->phone !== '') {
                    $output .= '<tr><td>' . $item->name . '</td>';
                    $output .= '<td>' . $item->city_name . '</td>';
                    $output .= '<td>' . $item->phone . '</td></tr>';
                }
            }
        }

        $output .= '</tbody></table></body>';
        return $output;
    }
}
