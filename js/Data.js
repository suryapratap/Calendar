var data = {
    headers: 'date sales client'.split(' '),
    values: [
        ['2013 Jun 29 01:00', 'S01', 'C01'],
        ['2013 Jun 29 03:00', 'S01', 'C01'],
        ['2013 Jun 29 05:00', 'S01', 'C01'],
        ['2013 Jun 29 07:00', 'S01', 'C01'],
        ['2013 Jun 29 08:00', 'S01', 'C01'],
        ['2013 Jun 29 10:00', 'S01', 'C01'],
        ['2013 Jun 29 12:00', 'S01', 'C01'],
        ['2013 Jun 30 14:00', 'S01', 'C01']
    ]
};

function loadData(data, useHour) {
    var counts = {};
    var id = '';
    for (var row in data) {
        var dt = moment(data[row][0]);
        if (useHour) {
            id = '#cell_' + dt.format('YYYYMMDDHH') + '>.data';
            $(id).html('<span>' + data[row][2] + '</span>');
        } else {
            id = '#cell_' + dt.format('YYYYMMDD') + '>.data';
            var val = counts[id] ? (parseInt(counts[id])) : 0;
            counts[id] = val + 1;
        }
    }

    if (!useHour) {
        for (var rec in counts) {
            var html = '<div class="valHolder"><span class="followup tickMark1" style="height: 20px;margin:0;padding: 0 ;">_count_</span></div>'
            html = html.replace('_count_',counts[rec]);
            $(rec).html(html);
        }
    }
}

