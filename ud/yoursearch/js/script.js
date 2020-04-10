// Search function
function search() {
    //Clear results
    $('#results').html('');
    $('#buttons').html('');

    q = $('#query').val();

    // // GET request
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet',
            q: q,
            type: 'video',
            maxResults: 10,
            key: 'AIzaSyBFBCB7KZ3FnKWUa7vzt3b3kynwNo8d5pE'
        },
        function(data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;
            // log data
            console.log(data);
            $.each(data.items, function(i, item) {
                // Get output
                var output = getOutput(item);
                // Display results
                $('#results').append(output);
            });
            var buttons = getButtons(prevPageToken, nextPageToken);
            // Display buttons
            $('#buttons').append(buttons);
        }
    );
}

//Next Page function
function nextPage() {

    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');

    //Clear results
    $('#results').html('');
    $('#buttons').html('');

    q = $('#query').val();

    // GET request
    $.get("https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet,id',
            q: q,
            pageToken: token,
            type: 'video',
            maxResults: 10,
            key: 'AIzaSyBFBCB7KZ3FnKWUa7vzt3b3kynwNo8d5pE'
        },
        function(data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;
            // log data
            console.log(data);
            $.each(data.items, function(i, item) {
                // Get output
                var output = getOutput(item);
                // Display results show and append output
                $('#results').append(output);
            });
            var buttons = getButtons(prevPageToken, nextPageToken);

            // Display buttons
            $('#buttons').append(buttons);
        }
    );

}

//Prev Page function
function prevPage() {

    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');
    //Clear results
    $('#results').html('');
    $('#buttons').html('');

    q = $('#query').val();

    // GET request
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet,id',
            q: q,
            pageToken: token,
            type: 'video',
            maxResults: 10,
            key: 'AIzaSyBFBCB7KZ3FnKWUa7vzt3b3kynwNo8d5pE'
        },
        function(data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;
            // log data
            console.log(data);
            $.each(data.items, function(i, item) {
                // Get output
                var output = getOutput(item);
                // Display results
                $('#results').append(output);
            });
            var buttons = getButtons(prevPageToken, nextPageToken);
            // Display buttons
            $('#buttons').append(buttons);
        }
    );

}

// Buld output
function getOutput(item) {
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    var output = '<li>' +
        '<div class = "list-left">' +
        '<h3><a class="fancybox fancybox.iframe" data-fancybox="gallery" href="https://www.youtube.com/embed/' + videoId + '"><img src = "' + thumb + '" title="' + title + '"></a></h3>' +
        '</div>' +
        '<div class = "list-right">' +
        '<h3><a class="fancybox fancybox.iframe" data-fancybox="video" href="https://www.youtube.com/embed/' + videoId + '">' + title + '</a></h3>' +
        '<small>By <span class = "cTitle">' + channelTitle + '</span>on ' + videoDate + '</small>' +
        '<p>' + description + '</p>' +
        '</div>' +
        '</li>' +
        '<div class="clearfix"></div>' +
        '';
    return output;
}

// Build the buttons nextPage and PrevPage

function getButtons(prevPageToken, nextPageToken) {
    if (!prevPageToken) {
        console.log(prevPageToken);
        var btnoutput =
            '<div class="button-container">' +
            '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
            'onclick="nextPage();">Next Page</button></div>';
    } else {
        var btnoutput =
            '<div class ="button-container">' +
            '<button id="prev-button" class="paging-button" data-token="' + prevPageToken + '" data-query="' + q + '"' + 'onclick="prevPage();">Prev Page</button>' +
            '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' + 'onclick="nextPage();">Next Page</button></div>';
    }
    return btnoutput;
}

// // Search bar handler
// $(function() {
//     var searchfield = $('#query');
//     var icon = $('#search-btn');

//     // focus handler
//     $(searchfield).on('focus', function() {
//         $(this).animate({
//             width: '100%'
//         }, 800);

//         $(icon).animate({
//             right: '10px'
//         }, 800);
//     });

//     // Blur event handler
//     $(searchfield).on('blur', function() {
//         if (searchfield.val() == '') {
//             $(searchfield).animate({
//                 width: '60%'
//             }, 800, function() {});

//             $(icon).animate({
//                 right: '430px'
//             }, 800, function() {});
//         }
//     });

//     $('#search-form').submit(function(e) {
//         e.preventDefault();
//     });
// })


// Search bar handler
$(function() {
    var searchfield = $('#query');
    var icon = $('#search-btn');

    // focus handler
    $(searchfield).on('focus', function() {
        $(this).animate({
            width: '100%'
        }, 400);

        $(icon).animate({
            right: '10px'
        }, 400);
    });

    // Blur event handler

    $(searchfield).on('blur', function() {
        if (searchfield.val() == '') {
            $(searchfield).animate({
                width: '45%'
            }, 400, function() {});

            $(icon).animate({
                right: '360px'
            }, 400, function() {});
        }
    });
    $('#search-form').submit(function(e) {
        e.preventDefault();
    });
})