<?php

namespace App\Constants;

class BusinessConstants
{
    public static final function getDefaultFields()
    {
        return [
            'categories.name as category_name',
            'businesses.id',
            'businesses.name',
            'businesses.cnpj',
            'businesses.email',
            'businesses.website',
            'businesses.description',
            'businesses.facebook_address',
            'businesses.twitter_address',
            'businesses.address',
            'businesses.district',
            'businesses.category_id',
            'businesses.ip',
            'businesses.newsletter',
            'businesses.phone',
            'businesses.highlight',
            'businesses.created_at',
            'cities.id as city_id',
            'cities.name as city_name'
        ];
    }
}
