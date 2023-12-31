let timeZone = {
    timeZones: [
        {
            name: '(GMT) Casablanca',
            value: 'Morocco Standard Time'
        },
        {
            name: '(GMT) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London',
            value: 'GMT Standard Time'
        },
        {
            name: '(GMT) Monrovia, Reykjavik',
            value: 'Greenwich Standard Time'
        },
        {
            name: '(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',
            value: 'W. Europe Standard Time'
        },
        {
            name: '(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague',
            value: 'Central Europe Standard Time'
        },
        {
            name: '(GMT+01:00) Brussels, Copenhagen, Madrid, Paris',
            value: 'Romance Standard Time'
        },
        {
            name: '(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb',
            value: 'Central European Standard Time'
        },
        {
            name: '(GMT+01:00) West Central Africa',
            value: 'W. Central Africa Standard Time'
        },
        {
            name: '(GMT+02:00) Amman',
            value: 'Jordan Standard Time'
        },
        {
            name: '(GMT+02:00) Athens, Bucharest, Istanbul',
            value: 'GTB Standard Time'
        },
        {
            name: '(GMT+02:00) Beirut',
            value: 'Middle East Standard Time'
        },
        {
            name: '(GMT+02:00) Cairo',
            value: 'Egypt Standard Time'
        },
        {
            name: '(GMT+02:00) Harare, Pretoria',
            value: 'South Africa Standard Time'
        },
        {
            name: '(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius',
            value: 'FLE Standard Time'
        },
        {
            name: '(GMT+02:00) Jerusalem',
            value: 'Israel Standard Time'
        },
        {
            name: '(GMT+02:00) Minsk',
            value: 'E. Europe Standard Time'
        },
        {
            name: '(GMT+02:00) Windhoek',
            value: 'Namibia Standard Time'
        },
        {
            name: '(GMT+03:00) Baghdad',
            value: 'Arabic Standard Time'
        },
        {
            name: '(GMT+03:00) Kuwait, Riyadh',
            value: 'Arab Standard Time'
        },
        {
            name: '(GMT+03:00) Moscow, St. Petersburg, Volgograd',
            value: 'Russian Standard Time'
        },
        {
            name: '(GMT+03:00) Nairobi',
            value: 'E. Africa Standard Time'
        },
        {
            name: '(GMT+03:00) Tbilisi',
            value: 'Georgian Standard Time'
        },
        {
            name: '(GMT+03:30) Tehran',
            value: 'Iran Standard Time'
        },
        {
            name: '(GMT+04:00) Abu Dhabi, Muscat',
            value: 'Arabian Standard Time'
        },
        {
            name: '(GMT+04:00) Baku',
            value: 'Azerbaijan Standard Time'
        },
        {
            name: '(GMT+04:00) Port Louis',
            value: 'Mauritius Standard Time'
        },
        {
            name: '(GMT+04:00) Yerevan',
            value: 'Caucasus Standard Time'
        },
        {
            name: '(GMT+04:30) Kabul',
            value: 'Afghanistan Standard Time'
        },
        {
            name: '(GMT+05:00) Ekaterinburg',
            value: 'Ekaterinburg Standard Time'
        },
        {
            name: '(GMT+05:00) Islamabad, Karachi',
            value: 'Pakistan Standard Time'
        },
        {
            name: '(GMT+05:00) Tashkent',
            value: 'West Asia Standard Time'
        },
        {
            name: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi',
            value: 'India Standard Time'
        },
        {
            name: '(GMT+05:30) Sri Jayawardenepura',
            value: 'Sri Lanka Standard Time'
        },
        {
            name: '(GMT+05:45) Kathmandu',
            value: 'Nepal Standard Time'
        },
        {
            name: '(GMT+06:00) Almaty, Novosibirsk',
            value: 'N. Central Asia Standard Time'
        },
        {
            name: '(GMT+06:00) Astana, Dhaka',
            value: 'Central Asia Standard Time'
        },
        {
            name: '(GMT+06:30) Yangon (Rangoon)',
            value: 'Myanmar Standard Time'
        },
        {
            name: '(GMT+07:00) Bangkok, Hanoi, Jakarta',
            value: 'SE Asia Standard Time'
        },
        {
            name: '(GMT+07:00) Krasnoyarsk',
            value: 'North Asia Standard Time'
        },
        {
            name: '(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi',
            value: 'China Standard Time'
        },
        {
            name: '(GMT+08:00) Irkutsk, Ulaan Bataar',
            value: 'North Asia East Standard Time'
        },
        {
            name: '(GMT+08:00) Kuala Lumpur, Singapore',
            value: 'Singapore Standard Time'
        },
        {
            name: '(GMT+08:00) Perth',
            value: 'W. Australia Standard Time'
        },
        {
            name: '(GMT+08:00) Taipei',
            value: 'Taipei Standard Time'
        },
        {
            name: '(GMT+09:00) Osaka, Sapporo, Tokyo',
            value: 'Tokyo Standard Time'
        },
        {
            name: '(GMT+09:00) Seoul',
            value: 'Korea Standard Time'
        },
        {
            name: '(GMT+09:00) Yakutsk',
            value: 'Yakutsk Standard Time'
        },
        {
            name: '(GMT+09:30) Adelaide',
            value: 'Cen. Australia Standard Time'
        },
        {
            name: '(GMT+09:30) Darwin',
            value: 'AUS Central Standard Time'
        },
        {
            name: '(GMT+10:00) Brisbane',
            value: 'E. Australia Standard Time'
        },
        {
            name: '(GMT+10:00) Canberra, Melbourne, Sydney',
            value: 'AUS Eastern Standard Time'
        },
        {
            name: '(GMT+10:00) Canberra, Melbourne, Sydney',
            value: 'West Pacific Standard Time'
        },
        {
            name: '(GMT+10:00) Guam, Port Moresby',
            value: 'West Pacific Standard Time'
        },
        {
            name: '(GMT+10:00) Hobart',
            value: 'Tasmania Standard Time'
        },
        {
            name: '(GMT+10:00) Vladivostok',
            value: 'Vladivostok Standard Time'
        },
        {
            name: '(GMT+11:00) Magadan, Solomon Is., New Caledonia',
            value: 'Central Pacific Standard Time'
        },
        {
            name: '(GMT+12:00) Auckland, Wellington',
            value: 'New Zealand Standard Time'
        },
        {
            name: '(GMT+12:00) Fiji, Kamchatka, Marshall Is.',
            value: 'Fiji Standard Time'
        },
        {
            name: '(GMT+13:00) Nuku\'alofa',
            value: 'Tonga Standard Time'
        },
        {
            name: '(GMT-01:00) Azores',
            value: 'Azores Standard Time'
        },
        {
            name: '(GMT-01:00) Cape Verde Is.',
            value: 'Cape Verde Standard Time'
        },
        {
            name: '(GMT-02:00) Mid-Atlantic',
            value: 'Mid-Atlantic Standard Time'
        },
        {
            name: '(GMT-03:00) Brasilia',
            value: 'E. South America Standard Time'
        },
        {
            name: '(GMT-03:00) Buenos Aires',
            value: 'Argentina Standard Time'
        },
        {
            name: '(GMT-03:00) Georgetown',
            value: 'SA Eastern Standard Time'
        },
        {
            name: '(GMT-03:00) Greenland',
            value: 'Greenland Standard Time'
        },
        {
            name: '(GMT-03:00) Montevideo',
            value: 'Montevideo Standard Time'
        },
        {
            name: '(GMT-03:30) Newfoundland',
            value: 'Newfoundland Standard Time'
        },
        {
            name: '(GMT-04:00) Atlantic Time (Canada)',
            value: 'Atlantic Standard Time'
        },
        {
            name: '(GMT-04:00) La Paz',
            value: 'SA Western Standard Time'
        },
        {
            name: '(GMT-04:00) Manaus',
            value: 'Central Brazilian Standard Time'
        },
        {
            name: '(GMT-04:00) Santiago',
            value: 'Pacific SA Standard Time'
        },
        {
            name: '(GMT-04:30) Caracas',
            value: 'Venezuela Standard Time'
        },
        {
            name: '(GMT-05:00) Bogota, Lima, Quito, Rio Branco',
            value: 'SA Pacific Standard Time'
        },
        {
            name: '(GMT-05:00) Eastern Time (US & Canada)',
            value: 'Eastern Standard Time'
        },
        {
            name: '(GMT-05:00) Indiana (East)',
            value: 'US Eastern Standard Time'
        },
        {
            name: '(GMT-06:00) Central America',
            value: 'Central America Standard Time'
        },
        {
            name: '(GMT-06:00) Central Time (US & Canada)',
            value: 'Central Standard Time'
        },
        {
            name: '(GMT-06:00) Guadalajara, Mexico City, Monterrey',
            value: 'Central Standard Time (Mexico)'
        },
        {
            name: '(GMT-06:00) Saskatchewan',
            value: 'Canada Central Standard Time'
        },
        {
            name: '(GMT-07:00) Arizona',
            value: 'US Mountain Standard Time'
        },
        {
            name: '(GMT-07:00) Chihuahua, La Paz, Mazatlan',
            value: 'Mountain Standard Time (Mexico)'
        },
        {
            name: '(GMT-07:00) Mountain Time (US & Canada)',
            value: 'Mountain Standard Time'
        },
        {
            name: '(GMT-08:00) Pacific Time (US & Canada)',
            value: 'Pacific Standard Time'
        },
        {
            name: '(GMT-08:00) Tijuana, Baja California',
            value: 'Pacific Standard Time (Mexico)'
        },
        {
            name: '(GMT-09:00) Alaska',
            value: 'Alaskan Standard Time'
        },
        {
            name: '(GMT-10:00) Hawaii',
            value: 'Hawaiian Standard Time'
        },
        {
            name: '(GMT-11:00) Midway Island, Samoa',
            value: 'Samoa Standard Time'
        },
        {
            name: '(GMT-12:00) International Date Line West',
            value: 'Dateline Standard Time'
        },
    ]
}

export default timeZone