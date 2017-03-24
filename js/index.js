$(() => {
    $('#start-timer').click(() => {
        window.open("timer.html?timer-line=" + encodeURIComponent($('#timer-line').val()),
                    "Timer Window",
                    "width=800,height=600");
    });
});
